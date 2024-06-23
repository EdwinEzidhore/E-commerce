const express = require('express');
const router = express.Router();
const UserModel = require('../Model/User/User');
const upload=require("../Multer/User/multer")
const ErrorHandler = require('../Utils/ErrorHandler');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const sendMail = require('../Utils/sendMail');
const CatchAsyncErrors = require('../Middleware/CatchAsyncErrors');
const sendToken = require('../Utils/jwtToken');
const ProductModel = require('../Model/Admin/AdminAddProduct');
const isAuthenticated = require('../Middleware/auth')
const CartModel = require('../Model/User/Cart');
const mongoose = require('mongoose')
const { ObjectId } = require('mongoose').Types;
const { log } = require('util');
const crypto = require('crypto');
const OrderModel = require('../Model/User/Order');
const AddressModel = require('../Model/User/Address');
require('dotenv').config(
    {path: 'Config/.env'}
);
const Razorpay = require('razorpay');
// const { default: products } = require('razorpay/dist/types/products');





const razorpayInstance = new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});



router.post('/create-user', upload.single('file'), async (req, res, next) => {

    try {
        const { name, email, password } = req.body;

        const userEmail = await UserModel.findOne({ email });
        if (userEmail) {
            const filename = req.file.filename;
            const filePath = `uploads/${filename}`;
            
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ message: "Error Deleting File" });
                } 
            });
            
            res.status(400).json({message:'Account already exists'})
            // return next(new ErrorHandler("Account already exists", 400));
        }
        if (!userEmail) {
            const Filename = req.file.filename;
            const fileurl = path.join(Filename);
          
            const user = {
                name: name,
                email: email,
                password: password,
                avatar: {
                    public_id: fileurl,
                    url: fileurl
                }
                
            };
            const activationToken = createActivationToken(user);
            const activationurl = `http://localhost:5173/activation/${activationToken}`;
    
            try {
                await sendMail({
                    email: user.email,
                    subject: 'Activate Your Account',
                    message: `Hello ${user.name} please Click on the link to activate your account: ${activationurl}`
                });
                
                res.status(201).json({ success:true,message:`Please check your email: ${user.email} to activate your account`})
    
            } catch (err) {
                return next(new ErrorHandler(err.message,500))
            }
    }
      
    
} catch (err) {
        return next(new ErrorHandler(err.message,400));
}   
});

//function to create activation token
const createActivationToken = (user) => {
    return jwt.sign(user, process.env.ACTIVATION_SECRET, {
        expiresIn: '10m'
    });
};


router.post('/activation', CatchAsyncErrors(async (req, res, next) => {
    try {
        const { activation_token } = req.body;
        const newUser = jwt.verify(
            activation_token,
            process.env.ACTIVATION_SECRET
        );

        if (!newUser) {
            return next(new ErrorHandler("Invalid token", 400));
        }
        const { name, email, password, avatar } = newUser;
        let user = await UserModel.findOne({ email });

        if (user) {
            return next(new ErrorHandler("User Already Exists", 400));
        }
        user = await UserModel.create({ name, email, password, avatar });
        sendToken(user, 201, res);

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})
);

//User Login Route
router.post('/login', CatchAsyncErrors(async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorHandler("Please provide all fields", 400));

        }
        const user = await UserModel.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorHandler('Requested user not found', 400));
        }
        const isPasswordValid = await user.ComparePassword(password);
        if (!isPasswordValid) {
            return next(new ErrorHandler("Invalid Credentials", 400));
        }
        sendToken(user, 201, res)
        let usermodel = await UserModel.findByIdAndUpdate(
            user._id,
            { status: true },
            {new:true},
        );
        if (usermodel) {
            return res.status(200).json({ success: true, msg: 'User Login Success', usermodel });
        }

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));

router.get('/isLoggedIn',isAuthenticated, async (req, res) => {
    try {
        const isUser = await UserModel.findOne({ _id: req.user._id });
        const userStatus = isUser.status;
        if (userStatus) {
            return res.status(200).json({success:true,msg:'User is logged in',userStatus,isUser})
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})

//HomePage featured product listing Route
router.get('/featured', async (req, res, next) => {
    try {

        // const isUser = await UserModel.findOne({ _id: req.user._id });

        
        const Products = await ProductModel.find({});
        const sliced=Products.reverse().slice(0, 6);
       
        const FilteredBrand = Products.filter((el, index, self) =>
            index === self.findIndex((t) => t.brand === el.brand)
          );
        
        
        
        if (Products) {
            return res.status(200).json({ msg:'sucess',products:sliced,Brands:FilteredBrand});
        }
        
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
    

});

//User cart Route
router.get('/cart', isAuthenticated, async (req, res, next) => {
    try {
       
        const user_data = await UserModel.findOne({ email: req.user.email });
        const userId = user_data._id;
        const { id } = req.query;
        const product = await ProductModel.findOne({ _id: id });
       
        if (product.stock <= 0) {
            return res.status(200).json({ success: false, msg: 'Product is Out of stock' })
        }
        let userCart = await CartModel.findOne({ userId });
       
        if (!userCart) {
            userCart = new CartModel({
                userId,
                products: [],
               
            });
        }

        const existingProduct = userCart.products.findIndex((pro) => pro.productID.toString() === id);
        
        if (existingProduct !== -1) {
            res.status(200).json({ success: false, msg: `Item already in cart` })
        } else {
           
           
            userCart.products.push({
                productID: new mongoose.Types.ObjectId(id),
                quantity: 1,
               

            });
            
            await userCart.save();
            let populated = await CartModel.findOne({ userId: userId }).populate({
                path: 'products.productID',
                model: 'product'
                
            });
            
            res.status(200).json({ msg: 'Product added to cart',populated});
        }
      
       
        
        


    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
});

//To get cartitems on Cart Page
router.get('/getCartItems', isAuthenticated, async (req, res, next) => {
    try {
        const userId = req.user._id;
        let userCart = await CartModel.findOne({ userId: userId }).populate({
            path: 'products.productID',
            model: 'product'
            
        });
        let totalAmount = 0;
        let discount = 0;
        userCart.products.forEach((el) => {
           
            totalAmount += el.productID.sellingPrice * el.quantity;
            discount +=  el.productID.originalPrice -el.productID.sellingPrice ;
        });

        console.log("dis" + discount);
        console.log( "ttl" +totalAmount);
        
        
        if (!userCart) {
            userCart = new CartModel({
                userId,
                products: [],
            });
            
            res.status(200).json({ success: false, cart: userCart});
        } else {
          
            

            res.status(200).json({ success: true, cart: userCart,total: totalAmount ,discount:discount});
        }

       

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

router.delete('/', isAuthenticated, async (req, res, next) => {
    try {
        const user = await UserModel.findOne({ _id: req.user._id });
        const { user_id, item_id } = req.query;
       
        // if (user._id !== user_id) {
        //     return res.status(404).json({ success: false, msg: 'User not found' });
        // }
        let cart = await CartModel.updateOne(
            { userId: user_id },
            {
                $pull: { products: { productID: item_id } }
            }
        )
        cart = await CartModel.findOne({ userId: user_id }).populate({
            path: 'products.productID',
            model: 'product'
            
        });
        const cartLength = cart.products.length;
       
        if (cart) {
            res.status(200).json({ success: true, msg: 'Product removed from cart', cart, cartLength })
        }

       
       
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

router.patch('/qty', async (req, res, next) => {

    try {
        const { user_id, item_id, ope, } = req.query;

        let curQty = parseInt(req.query.qty);
        
        const product = await ProductModel.findOne({ _id: item_id });
        const stock = product.stock;
        let cart = await CartModel.findOne({ userId: user_id });
        const productIndex = cart.products.findIndex(pro => pro.productID._id.toString() === item_id);


       
        if (ope == 'plus' && !stock < curQty) {
            cart.products[productIndex].quantity = curQty + 1;
           
        }
        else if (ope == 'minus') {
            cart.products[productIndex].quantity = Math.max(1, curQty - 1);
        }
        else {
            return res.status(204).json({ success: false, msg: 'Product out of stock' });
        }
      
        await cart.save();
        

        const cartLength = cart.products.lenght;
        const quantity_changed_item = cart.products.find((product) => product.productID == item_id);
   

        
        return res.status(200).json({ success: true, quantity_changed_item, cartLength })
        
        
     
        
        
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
    
});


router.get('/getUserInfo', isAuthenticated, async (req, res) => {
    const user = req.user;
    const user_status = user.status;
    const user_id = user._id;
    
    if (user_status == true) {
        const user_details = await UserModel.findOne({ _id: user_id });
        return res.status(200).json({ user_details })
    }
});

router.post('/cart/checkout',isAuthenticated, async (req, res, next) => {
    try {
        const amount = req.body.cart_Total;
        const user_id = req.user.id
        const user = await UserModel.findOne({ _id: user_id });
        if (user.status===true) {
            const cart = await CartModel.findOne({ userId: user_id }).populate({
                path: 'products.productID',
                model: 'product'
                
            });
            
            if (cart) {
                const options = {
                    amount: Number(amount * 100),
                    currency: "INR",
                    receipt: crypto.randomBytes(10).toString("hex"),
                }
        
                razorpayInstance.orders.create(options, (error, order) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).json({ message: "Something Went Wrong!" });
                    }
                    res.status(200).json({msg:'order ', data: order,cart });
                    // console.log(order)
                });
            }
            
        }



    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }

});


router.post('/verify', async (req, res) => {
    const { razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        cart,
        cart_Total,
        activeAddress } = req.body;

    const user_id = cart.userId;


    try {
        // Create Sign
        const sign = razorpay_order_id + "|" + razorpay_payment_id;

        // Create ExpectedSign
        const expectedSign = crypto.createHmac("sha256", razorpayInstance.key_secret)
            .update(sign.toString())
            .digest("hex");

        // console.log(razorpay_signature === expectedSign);
        const isAuthentic = expectedSign === razorpay_signature;
     
        if (isAuthentic) {
            const user = await UserModel.findOne({ _id: user_id });
            if (!user) {
                res.json({ msg: 'Invalid User' });
            }

        
            let order = new OrderModel({
                userId: user_id,
                products: [],
                totalAmount: cart_Total,
                razorpay_order_id:razorpay_order_id,
                razorpay_payment_id:razorpay_payment_id,
                razorpay_signature: razorpay_signature,
                PaymentStatus: 'Success',
                Address:activeAddress,
            });
            const cart_item=cart.products.map((item, index) => {
                
                order.products.push({
                    productId: item.productID._id,
                    price: item.productID.sellingPrice,
                    quantity: item.quantity,
                });
               
                return ProductModel.updateOne(
                    { _id: item.productID._id },
                    { $inc: { stock: -item.quantity } }  
                );
            });

            await order.save();

            await Promise.all(cart_item);
           
            const user_cart=await CartModel.findOneAndDelete({userId:user_id})

            return res.json({
                message: "Payement Successfull",order
            });
        } else {
            res.json({msg:'paymet failed'})
        }
    } catch (err) {
        return next(new ErrorHandler(err.message, 500));
    }
    
});

router.post('/cart/checkout/cod',isAuthenticated, async (req, res, next) => {
    const { cart_Total ,activeAddress} = req.body;
    const user_id = req.user.id;

    try {
        const cart = await CartModel.findOne({ userId: user_id }).populate({
            path: 'products.productID',
            model: 'product'
            
        });
        // console.log(cart);
        
        let order = new OrderModel({
            userId: cart.userId,
            products: [],
            totalAmount: cart_Total,
            OrderStatus: 'Order Placed',
            PaymentStatus: 'Pending',
            paymentMethod: 'COD',
            Address: activeAddress,
        });

        const cart_item=cart.products.map((pro) => {
            order.products.push({
                productId: pro.productID._id,
                price: pro.productID.sellingPrice,
                quantity: pro.quantity,
            });
           
        });

        await order.save();
      

        const user_cart = await CartModel.findOneAndDelete({ userId: user_id });

        return res.status(200).json({msg:'Order placed',order})

      
         
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

router.patch('/set-address', isAuthenticated, async (req, res, next) => {
    const user_id = req.user.id;
    try {
        const {
            name,
            phone,
            pincode,
            locality,
            address,
            city,
            state,
            landmark,
            alternate_phone,
            address_type,
        } = req.body;

        let user = await UserModel.findOne({ _id: user_id });
        if (!user) {
            return res.status(400).json({msg:'Please Login to continue'})
        }
        let Address = await AddressModel.findOne({userID:user_id });

        if (!Address) {

            Address = new AddressModel({
                
                userID: user_id,
                address: []
            });
           
        }
        Address.address.push({
            Name: name,
            phoneNumber: phone,
            state: state,
            city: city,
            main_address: address,
            zipcode: pincode,
            landmark: landmark,
            locality: locality,
            alternate_phone: alternate_phone,
            addressType:address_type,
            
        });
        await Address.save();

        res.status(200).json({msg:'created',Address:Address.address})


    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }

});

router.get('/get-address', isAuthenticated, async (req, res) => {
    const user_id = req.user.id;
    try {
        const user = await UserModel.findOne({ _id: user_id });
        // console.log(user);
        if (!user) {
            return res.status(400).json({ msg: 'Pleas login' });
        }
        const address = await AddressModel.findOne({ userID: user_id });
        
        if (address) {
            return res.status(200).json({
                Address: address.address
                
             })
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

router.delete('/remove-address', async (req, res, next) => {
    const { id } = req.query;
    // 
    try {
        await AddressModel.updateOne({
            $pull: { address: { _id: id } }
        });
        const address = await AddressModel.find({});
        
        if (address) {
            return res.status(200).json({ msg: 'Address removed', Address: address })
        }

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

router.get('/getOrders', isAuthenticated, async (req, res, next) => {
    const user_id = req.user.id;
    const ordered_Products = [];
    try {

        const orders = await OrderModel.find({ userId: user_id }).populate({
            path: 'products.productId',
            model: 'product'
        });
        if (!orders) {
            return res.status(404).json({ msg: 'User not found' });
        }


        orders.map((item) => {
            // console.log('first',item);
            return item.products.map((pro) => {
                // console.log('sec',pro);
                ordered_Products.push({
                    order_ID: item._id,
                    user_ID: item.userId,
                    item_ID: pro.productId._id,
                    name: pro.productId.name,
                    description: pro.productId.description,
                    brand: pro.productId.brand,
                    image_url: pro.productId.productImage,
                    price: pro.price,
                    category: pro.productId.category,
                    orderDate: item.orderDate,
                    orderStatus: item.OrderStatus,
                    paymentStatus: item.PaymentStatus,
                    address: item.Address,
                });

                
            })
        });

        return res.status(200).json({ msg: 'Ordered items', orders: ordered_Products.reverse() });

 

        
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

// router.get('/women', async (req, res, next) => {
//     const page = req.query.page;
//     const pageLimit = 8;
//     try {
//         const excludeFields = ['sort', 'page'];
//         const queryObj = { ...req.query };
//         excludeFields.forEach((el) => {
//             delete queryObj[el];

//         });
      

//         const item = await ProductModel.find(queryObj)
//         let totalItems = item.length;
        

//         const brands = item.map((el) => el.brand);
//         const colors = item.map((el) => el.Details.colour);

        
//         const filteredBrand = brands.filter((el, index) => {//Removing duplicate brand names from brands
//             return brands.indexOf(el) === index
//         });

//         const filteredColor = colors.filter((el, index) => {//Removing duplicate brand names from brands
//             return colors.indexOf(el) === index
//         });

//         const products = await ProductModel.find(queryObj).skip((page * pageLimit) - pageLimit).limit(pageLimit);
        

//         return res.status(200).json({ msg: 'Product Found', item: products, Brands: filteredBrand, Colors: filteredColor, count: totalItems });
        
//     } catch (error) {
//         return next(new ErrorHandler(error.message, 500));
//     } 
// });
 
router.get('/category', async (req, res, next) => {
    const page = req.query.page;
    const pageLimit = 8;
    try {
        const excludeFields = ['sort', 'page'];
        const queryObj = { ...req.query };
        excludeFields.forEach((el) => {
            delete queryObj[el];
        });
        
        
        //to find totalitems ,brands and colors in men section
        const items = await ProductModel.find(queryObj);
        let totalItems = items.length;
        const brands = items.map((el) => el.brand);
        const colors = items.map((el) => el.Details.colour);        
        const filteredBrand = brands.filter((el, index) => {//Removing duplicate brand names from brands
            return brands.indexOf(el) === index
        });
        const filteredColor = colors.filter((el, index) => {//Removing duplicate brand names from brands
            return colors.indexOf(el) === index
        });



        // const products = await ProductModel.find(queryObj).skip((page * pageLimit) - pageLimit).limit(pageLimit);

        res.status(200).json({msg:'Product Found',item:items, Brands: filteredBrand, Colors: filteredColor,count: totalItems})
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})



module.exports = router;