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
const {isAuthenticated,localvariables} = require('../Middleware/auth')
const CartModel = require('../Model/User/Cart');
const mongoose = require('mongoose')
const { ObjectId } = require('mongoose').Types;
const { log } = require('util');
const crypto = require('crypto');
const OrderModel = require('../Model/User/Order');
const AddressModel = require('../Model/User/Address');
const WishlistModel = require('../Model/User/Wishlist');
const CouponModel = require('../Model/Admin/Coupon');
require('dotenv').config(
    {path: 'Config/.env'}
);
const Razorpay = require('razorpay');
const Wishlist = require('../Model/User/Wishlist');
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt');



const razorpayInstance = new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});



router.post('/create-user', upload.single('file'), async (req, res, next) => {


    try {
        const { name, email, password } = req.body;

        const userEmail = await UserModel.findOne({ email });
        if (userEmail) {
            if (req.file && req.file.filename) {
                const filename = req.file.filename;
                const filePath = `uploads/${filename}`;
                
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ message: "Error Deleting File" });
                    } 
                });
            }
            res.status(400).json({message:'Account already exists'})
            // return next(new ErrorHandler("Account already exists", 400));
        }
        if (!userEmail) {

            /* *******Logic to capitalize the first letter of name ******* */
            let Name = name;
            let words=Name.trim().split(' ')

            Name = words.map((word) => {
                
                let letters=word.split('');
                let capitalized=letters[0].toUpperCase(); 
                letters[0]=capitalized
                let new_word=letters.join('')
                return new_word
            })

            let new_name=Name.join(' ')
            
            const user = {
                name: new_name,
                email: email,
                password: password,
                ...(req.file ? {
                    avatar: {
                        public_id: req.file.filename,
                        url: path.join(req.file.filename)
                    }
                } : { avatar: null }),
                
                
            };
            const activationToken = createActivationToken(user);
            const activationurl = `${process.env.BASE_URL}/activation/${activationToken}`;
    
            try {
                await sendMail({
                    email: user.email,
                    subject: 'Activate Your Account',
                    message: `Hello ${user.name} please Click on the link to activate your account: ${activationurl}
                    
warm regards,
EZIRE Fashion store
                    `
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
        expiresIn: '5m'
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
        if (user.status === true) {
            
            sendToken(user, 201, res)
            let usermodel = await UserModel.findByIdAndUpdate(
                user._id,
                { isLoggedin: true },
                {new:true},
            );
        } else {
            return res.status(400).json({success:false,message:'User is blocked'})
        }

        // if (usermodel) {
        //     return res.status(200).json({ success: true, msg: 'User Login Success', usermodel });
        // }

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));

router.get('/logout',isAuthenticated, async (req, res, next) => {
    try {
        const user = req.user;
        if (user) {
            const { token } = req.cookies;
            if (token) {
                res.cookie("token", null, {
                    expires: new Date(Date.now()),
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production' ? true : false,
                    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
                    path: '/'
                  });

                await UserModel.updateOne(
                    { _id: user._id },
                    {
                        $set: {
                            isLoggedin:false,
                        }
                    }
                )
                return res.status(200).json({ success: true, msg: 'logged out!' });

            } else {
                return res.status(400).json({success:false,msg:'No user found'})
            } 
            
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})

router.get('/generate-otp', localvariables, async (req, res, next) => {
    const { email } = req.query;
  
    try {
        
        req.app.locals.OTP = otpGenerator.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });

        const user = await UserModel.findOne({ email: email });
        try {
            await sendMail({
                email,
                subject: 'Reset password',
                message: `A password reset for your account was requested. Please enter the OTP to change your password: 
                
        ${req.app.locals.OTP}
                
Warm regards,
EZIRE Fashion store
                `
              });
                
                res.status(201).json({ success:true,message:`Please check your email:${email} to reset your account password`,code: req.app.locals.OTP  })
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }


      
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

router.get('/verify-otp', async (req, res, next) => {
    const { OTP } = req.query;
    
    try {
        if (parseInt(req.app.locals.OTP) === parseInt(OTP)) {
            req.app.locals.OTP = null;
            req.app.locals.resetSession = true;
            return res.status(201).json({success:true, msg: 'Verification Successfull!' })
        }
        return res.status(400).json({ msg: 'Invalid OTP!' })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

router.get('/createResetSession', async (req, res, next) => {
    try {
        if (req.app.locals.resetSession) {
            return res.status(201).json({msg:'Access granted',flag:req.app.locals.resetSession})
        }
        return res.status(400).json({ msg: 'Session expired' });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }

});

router.post('/resetpassword', async (req, res,next) => {
    const { user, pass } = req.body;
    try {
        if (!req.app.locals.resetSession) {
            return res.status(400).json({ msg: 'Session expired' });
        }
        let isUser =await UserModel.findOne({ email: user });

        if (isUser) {
            const hashedPassword = await bcrypt.hash(pass, 10);

            isUser = await UserModel.updateOne(
                { email: user },
                {
                    $set: {
                        password: hashedPassword
                    }
                },  
            );
            if (isUser.acknowledged === true && isUser.modifiedCount === 1) {
                req.app.locals.resetSession = false;
                return res.status(201).json({success:true,msg:'Password updated successfully'})
            } else {
                return res.status(404).json({success:false,mg:'Error updating password'})
            }
            
            
        }
        return res.status(400).json({ success: false, msg: 'User not found' });


    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

router.get('/getUser', async (req, res, next) => {
    const { email } = req.query;

    try {
        const isUser = await UserModel.findOne({ email: email });
        if (!isUser) {
            return res.status(400).json({
                success: false,
                msg:'User not found'
            })
        }
        return res.status(200).json({success:true,msg:'User found'})
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})

router.get('/isLoggedIn', isAuthenticated, async (req, res,next) => {
    const user_id = req.user._id;
    try {
        const isUser = await UserModel.findById({ _id: user_id })

       
        const userStatus = isUser.status;
       
        let cart = await CartModel.findOne({userId: user_id});
        if (!cart) {
            cart = new CartModel({
                user_id,
                products: [],
            });
        }
        let cart_length = cart.products.length;
        

        if (userStatus) {
            return res.status(200).json({success:true,msg:'User is logged in',userStatus,isUser,CartLength:cart_length})
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
            const length = userCart.products.length;
           
            res.status(200).json({ msg: 'Product added to cart',populated,length:length});
        }
    
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
});

//To get cartitems on Cart Page
router.get('/getCartItems',isAuthenticated, async (req, res, next) => {
    
    try {
        const userId = req.user._id;
        
      
            let userCart = await CartModel.findOne({ userId: userId }).populate({
                path: 'products.productID',
                model: 'product'
                
            });
            if (!userCart) {
                userCart = new CartModel({
                    userId,
                    products: [],
                    
                });
                
                res.status(200).json({ success: false, cart: userCart});
            } else {
    
                let totalAmount = 0;
                let discount = 0;
                userCart.products.forEach((el) => {
                   
                    totalAmount += el.productID.sellingPrice * el.quantity;
                    discount +=  el.productID.originalPrice -el.productID.sellingPrice ;
                });
    
                const coupons = await CouponModel.find({status:'Active'});
                let filteredCoupons = coupons.filter((coupon) => {
                  return !coupon.redeemed.some((el) => el.user !== userId );
                });
                
                res.status(200).json({
                    success: true,
                    cart: userCart,
                    total: totalAmount,
                    discount: discount,
                    coupons: filteredCoupons,
                });
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
        const user_details = await UserModel.findOne({ _id: user_id }).populate("address");
        return res.status(200).json({ user_details })
    }
});

router.post('/cart/checkout', isAuthenticated, async (req, res, next) => {
    const { selectedCoupon } = req.body;
   
    try {
        
        const user_id = req.user.id;
        const user = await UserModel.findOne({ _id: user_id });
        if (user.status===true) {
            const cart = await CartModel.findOne({ userId: user_id }).populate({
                path: 'products.productID',
                model: 'product'
                
            });

            let amount = 0;
            if (cart) {
                
                cart.products.forEach((item) => {
                    amount += item.productID.sellingPrice * item.quantity;
                });

                if (selectedCoupon) {
                    amount > selectedCoupon.minimumPurchase ? amount -= selectedCoupon.amount:null;
                }
  
               
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
                    res.status(200).json({msg:'order ', data: order,cart,amount:amount ,coupon:selectedCoupon?selectedCoupon:null});
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
        activeAddress,
        coupon,
    } = req.body;

    
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
           
            const user_cart = await CartModel.findOneAndDelete({ userId: user_id });

            if (coupon) {
                await CouponModel.findOneAndUpdate(
                    { _id: coupon._id },
                    {
                        $set: {
                            redeemed: { user: user_id, status: true }
                           
                        }
                    },
                   {new:true},
                );
            }

            return res.status(200).json({
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
    const { activeAddress,selectedCoupon} = req.body;
    const user_id = req.user.id;
    console.log(selectedCoupon);

    try {
        const cart = await CartModel.findOne({ userId: user_id }).populate({
            path: 'products.productID',
            model: 'product'
            
        });
      
        let totalAmount = 0;
        cart.products.forEach((item) => {
            totalAmount += item.productID.sellingPrice * item.quantity;
        });

        if (selectedCoupon) {
            totalAmount > selectedCoupon.amount ? totalAmount -= selectedCoupon.amount : null;
            
            const coupon = await CouponModel.findOneAndUpdate(
                { _id: selectedCoupon._id },
                {
                    $set: {
                        redeemed: { user: user_id, status: true }
                       
                    }
                },
               {new:true},
            );
            console.log(coupon);
        }
        
        let order = new OrderModel({
            userId: cart.userId,
            products: [],
            totalAmount: totalAmount,
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

router.delete('/remove-address',isAuthenticated, async (req, res, next) => {
    const { id } = req.query;
    const userId = req.user._id;
    // 
    try {
        const isupdated = await AddressModel.updateOne(
            { userID: userId },
            {
                $pull: { address: { _id: id } }
            }
           
        );

        const address = await AddressModel.findOne({userID:userId});
        
        
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
    const  page  = parseInt(req.query.page);
    const pagelimit = 4;
    try {

        const orders = await OrderModel.find({ userId: user_id }).populate({
            path: 'products.productId',
            model: 'product'
        });

        const totalProducts = await ProductModel.find({}).estimatedDocumentCount();
        
        if (!orders) {
            return res.status(404).json({ msg: 'User not found' });
        }

        orders.map((item) => {
            // console.log('first',item);
            // res.json(item)
            return item.products.map((pro) => {
            //   console.log(pro);
                ordered_Products.push({
                    order_ID: item._id,
                    user_ID: item.userId,
                    item_ID: pro.productId._id,
                    name: pro.productId.name,
                    description: pro.productId.description,
                    brand: pro.productId.brand,
                    color: pro.productId.Details.colour,
                    image_url: pro.productId.productImage[0],
                    price: pro.price,
                    category: pro.productId.category,
                    orderDate: item.orderDate,
                    orderStatus: item.OrderStatus,
                    paymentStatus: item.PaymentStatus,
                    address: item.Address,
                    DeliveredOn:item.DeliveredOn,
                });

                
            })
        });
       

        return res.status(200).json({ msg: 'Ordered items', orders: ordered_Products,count:totalProducts });

 

        
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

router.patch('/cancel_order', async (req, res,next) => {
    const { orderID } = req.query;
    try {
        let order = await OrderModel.findOne({ _id: orderID });
        console.log(order);
        if (!order) {
            return res.json({ msg: 'Order not found' });
        }
        order = await OrderModel.findOneAndUpdate(
            { _id: orderID },
            {
                $set:{
                    OrderStatus: 'Cancelled',
                    PaymentStatus:'Failed',
                   
                },
            },
          {new:true}
        );
        return res.status(200).json({msg:`Order cancelled`})
    } catch (error) {
    
    }
});

router.patch('/return_order', async (req, res, next) => {
    const { orderID } = req.query;
    const { returnForm } = req.body;


    try {
        let order = await OrderModel.findOne({ _id: orderID });
        console.log(order);
        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }
        order = await OrderModel.findOneAndUpdate(
            { _id: orderID },
            
            {
                $set: {
                    OrderStatus: 'Returned',
                    returnReason: returnForm.reason,
                    InReturn: returnForm.inReturn,
                }
            },
            {new:true},
        );
        
        return res.status(200).json({msg:'Order returned'})

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})

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

        res.status(200).json({ msg: 'Product Found', item: items, Brands: filteredBrand, Colors: filteredColor, count: totalItems })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

router.post('/similar', async (req, res, next) => {
    const { SingleProduct } = req.body;
    
    try {
        let item = await ProductModel.findOne({ _id: SingleProduct._id });
        if (!item) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        const category = item.category;
        const name = item.name;
        item = await ProductModel.find({
            category: category,
            name: name,
        });
        item = item.filter((pro) => {
            return SingleProduct._id !== pro._id.toString();
        });
        if (item) {
            return res.status(200).json({ msg: 'Similar products', products: item });
        }
        

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});


router.post('/wishlist', isAuthenticated, async (req, res, next) => {
    const { id } = req.query;
    const user_id = req.user._id;
    
    try {
        const isuser = await UserModel.findOne({ _id: user_id });
        if (isuser) {
            const item = await ProductModel.findOne({ _id: id });
            let userWishlist = await WishlistModel.findOne({ userId: user_id });
            if (!userWishlist) {
                userWishlist = new WishlistModel({
                    userId: user_id,
                    products: [],
                });
            }
            const existingProduct = userWishlist.products.findIndex((pro) => pro.productID.toString() === id);
        
            if (existingProduct !== -1) {
                res.status(200).json({ success: false, msg: `Item already in wishList` })
            } else {
                userWishlist.products.push({
                    productID: new mongoose.Types.ObjectId(id),
                
                });
            }
            await userWishlist.save();


            let populated = await WishlistModel.findOne({ userId: user_id }).populate({
                path: 'products.productID',
                model: 'product'
                
            });
          
            const length = userWishlist.products.length;
           
            res.status(200).json({success:true, msg: 'Product added to wishList', populated, length: length });

        } else {
            return res.status(404).json({ msg: 'User is not loggedIn' })
        }
         
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

router.get('/get-wishlist', isAuthenticated, async (req, res, next) => {
    const user_id = req.user._id;
    try {
        const isuser = await UserModel.findOne({ _id: user_id });
       
        if (!isuser) {
            return res.status(404).json({ msg: 'User is not logged in' });
        } else {
            let userWishlist = await WishlistModel.findOne({ userId: user_id }).populate({
                path: 'products.productID',
                model: 'product'
            }).lean();//converts mongoose documents to plain javascript object(toavoid of nesting of datas under productID)

            if (userWishlist && userWishlist.products) {
                userWishlist.products = userWishlist.products.map(product => {
                    const { productID, ...rest } = product;//destructuring productID ,productID holds the populated product product
                    return { ...rest, ...productID };//...rest spreads the original fields of the product//...productID spreads the fileds from the populated productID
                });
            }
            
           
            if (!userWishlist) {
                userWishlist = new WishlistModel({
                    userId: user_id,
                    products: [],
                });
                return res.status(200).json({ msg: 'user wishlist', wishlist: userWishlist })
            }
            let items = userWishlist.products.length;
            
            return res.status(200).json({
                msg: 'wishlist',
                wishlist: userWishlist,
                items: items,
            })

        }
        
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

router.delete('/remove-wishlist', isAuthenticated, async (req, res, next) => {
    const { id } = req.query;
    const user_id = req.user._id;
   
    try {
        let wishList = await WishlistModel.updateOne(
            { userId: user_id },
            {
                $pull: { products: { productID: id } }
            }
           
        );
        if (wishList.modifiedCount === 0) {
            return next(new ErrorHandler('Product not found in wishlist or already removed', 404));
        }
        res.status(200).json({ success: true, msg: 'Product removed from wishlist' });
        
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

router.get('/search', async (req, res) => {
    try {
        const products = await ProductModel.find({});
        return res.status(200).json({ msg: 'products', products });
    } catch (error) {
        return new ErrorHandler(error.message, 500);
    }
});

router.post('/edit', isAuthenticated, localvariables, async (req, res) => {
   
    const query = req.query;
    const userID = req.user._id;
   

    try {
        let key = '';
        let value = '';
        for (let k in query) {
            key = k;
            value = query[k];
        }

        if (key === 'name') {
            let Name = value;
            let words = Name.trim().split(' ')

            Name = words.map((word) => {
                
                let letters = word.split('');
                let capitalized = letters[0].toUpperCase();
                letters[0] = capitalized
                let new_word = letters.join('')
                return new_word
            })

            let new_name = Name.join(' ');

            const isUserfound = await UserModel.findOneAndUpdate(
                { _id: userID },
                {
                    $set: {
                        name: new_name
                    }
                },
                { new: true }
            )

            if (isUserfound) {
                return res.status(201).json({ success: true, msg: 'Username updated successfully' })
            } else {
                return res.status(404).json({ success: false, msg: 'User not found' });
            }
        }
        if (key === 'email') {
            const user = await UserModel.findOne({ email: value });
            if (!user) {

                req.app.locals.OTP = otpGenerator.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });

                try {
                  
                    await sendMail({
                        email: value,
                        subject: 'Update email address',
                        message: `Your are just one step away from updating your email address. Please enter the OTP to change your email address: 
                        
                ${req.app.locals.OTP}
                        
Warm regards,
EZIRE Fashion store
                        `
                    });
                        
                    return res.status(200).json({ success: true, message: `Please check your email:${value} to reset your account password` });

                } catch (error) {
                    return next(new ErrorHandler(error.message, 500));
                }
                
            }
            return res.status(400).json({ success: false, msg: 'This username already exists!' })
        }
        
    } catch (error) {
        return new ErrorHandler(error.message, 500);
    }
});

router.post('/update-email', isAuthenticated, async (req, res, next) => {
    try {
        const { email } = req.body;
        const userID = req.user._id;
        const updatedUser = await UserModel.updateOne(
            { _id: userID },
            {
                $set: {
                    email: email
                }
            }
        );
        if (updatedUser.modifiedCount === 1 && updatedUser.matchedCount === 1) {

            req.app.locals.resetSession = false;
            return res.status(201).json({ success: true, msg: 'email address updated successfully' });

        } else {
            return res.status(400).json({ success: false, msg: 'error updating email address!' });
        }

       
        
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});


router.post('/coupons', async (req, res, next) => {
    try {
        const user = req.body.user;
        const coupons = await CouponModel.find({ status: 'Active' });
        
        if (user && user!==null) {
            let filteredCoupons = coupons.filter((coupon) => {
              return !coupon.redeemed.some((el) => el.user !== user._id );
            });
            return res.status(200).json({ success: true, msg: 'coupons', coupons: filteredCoupons });
        } else {
            return res.status(200).json({ success: true, msg: 'coupons', coupons: coupons });
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})



module.exports = router;