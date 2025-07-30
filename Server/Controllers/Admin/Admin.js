const express = require('express');
const router = express.Router();
const AdminInfo = require('../../Model/Admin/AdminLogin');
const ProductModel = require('../../Model/Admin/AdminAddProduct');
const ErrorHandler = require('../../Utils/ErrorHandler');
const Productupload = require('../../Multer/Admin/multer');
const path = require('path');
const UserModel = require('../../Model/User/User');
const { log, count } = require('console');
const OrderModel=require('../../Model/User/Order');
const User = require('../../Model/User/User');
const CouponModel = require('../../Model/Admin/Coupon');
const fs = require('fs');
const months=require('../../Data/Months.json')


router.post('/Admin', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const isAdmin = await AdminInfo.findOne({ email }).select('+password')

        if (!isAdmin) {
            return next(new ErrorHandler('Warning Traitor!!', 400));
        }
        const isPasswordvalid = isAdmin.password;
            
        if (password === isPasswordvalid) {
            res.status(200).json({ message: 'Admin Login successfully' });
        } else {
             res.status(404).json({ msg: 'invalid credentials' });
        }
       
        
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
   
});

router.post('/addProduct', Productupload.array('file'), async (req, res, next) => {
    try {
        const { name,
            description,
            brand,
            originalPrice,
            sellingPrice,
            category,
            status,
            stock,
            fabric,
            color,
            size,
        } = req.body;
       
        const file = req.files;
        let arr = [];
        file.forEach((element) => {
            arr.push({ name: element.filename, path: element.path });
        });
       
       
        if (!name || !description || !brand || !originalPrice || !sellingPrice || !category || !status || !stock) {
            return next(new ErrorHandler('Please,Provide field Values!!', 404));
        };

        const Image_url = arr.map(photo => photo.name);


        const product = await ProductModel.create({
            name,
            description,
            brand,
            originalPrice,
            sellingPrice,
            category,
            status,
            stock,
            productImage: Image_url,
            Details: {
                fabric: fabric,
                colour: color,
                size:size,
                
            }
          
            
    
        });

        if (product) {
            return res.status(200).json({ success: true, message: `product ${name} successfully added.` })
        }
        
    } catch (error) {
        return next(new ErrorHandler('server my error', 500))
    }
  
});

router.get('/products', async (req, res,next) => {
    try {
        const  page  = parseInt(req.query.page);
        const pagelimit = 5;
        const products = await ProductModel.find({}).sort({_id:-1}).skip((page*pagelimit)-pagelimit).limit(pagelimit)
        // const sorted = products.reverse();
      

        if (products) {
            const totalProducts = await ProductModel.estimatedDocumentCount();
            res.status(200).json({ products ,count:totalProducts});
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
    
})

router.get('/users', async (req, res, next) => {
    try {
        const users = await UserModel.find({});
        if (users) {
            res.status(200).json({ users:users });
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

router.patch('/user_status', async (req, res, next) => {
    try {
        const { user_id } = req.query;
        let user = await UserModel.findOne({ _id: user_id });
        if (!user) {
            return res.status(200).json({ msg: 'User not found' });
        }
        const user_status = !user.status 
        user = await UserModel.findByIdAndUpdate(
            { _id: user_id },
            { status: user_status },
            { new: true },
        );
        const isblocked = user.status === true ? 'Active' : 'Blocked';
        
        return res.status(200).json({msg:`User ${isblocked} `,users:user})
        
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});


router.patch('/item', async (req, res, next) => {
    try {
        const { item_id } = req.query;
        const product = await ProductModel.findById({ _id: item_id });

        if (!product) {
            return res.status(404).json({ success: false, msg: 'InValid ID' });
        }

        product.status = product.status === 'Available' ? 'Unavailable' : 'Available';

        const updatedProduct = await ProductModel.findByIdAndUpdate(
            { _id: item_id },
            { status: product.status },
            { new: true });
        
       
       
        if (product) {
            res.status(200).json(
                { updatedProduct }
            );
        }
       

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
   
});

router.delete('/item', async (req, res,next) => {
    try {
        const { item_id } = req.query;
    
        const product = await ProductModel.findById({ _id:item_id });
        if (!product) {
            return res.status(404).json({ success: false, msg: 'Invalid ID' });
        }
        const deleteProduct = await ProductModel.deleteOne({ _id: item_id });
        const RestProducts = (await ProductModel.find({})).reverse();
        if (deleteProduct) {
            return res.status(200).json({ RestProducts });
        } else {
            return res.status(400).json({success:false,msg:'Failed to delete Product!'})
        }

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});


router.get('/order', async (req, res, next) => {
    try {
        const orders = await OrderModel.find({}).populate('userId');
        return res.status(200).json(orders)
        
        
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

router.patch('/order_status', async (req, res, next) => {
    const { order_id } = req.query;
    const { status } = req.body;

    try {
        
        let order = await OrderModel.findOne({ _id: order_id });
        if (!order) {
            return res.status(404).json({ msg: 'Error finding product' })
        }
        let updateObjects={OrderStatus:status}
        if (status === 'Delivered') {
            const now = new Date();
            const day = now.getDate().toString();
            let Month = now.getMonth() + 1;
          
            months.forEach((month) => {
                if (month.id === Month) {
                    Month=month.monthCode
                }
            })
            const date = Month + '-' + day  ;
            updateObjects={...updateObjects,DeliveredOn:date}
        }
       
        order = await OrderModel.findByIdAndUpdate(
            { _id: order_id },
            updateObjects,
            { new: true },
        )
        return res.status(200).json({ msg: 'order status updated', Order: order });

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

router.patch('/payment_status', async (req, res, next) => {
    const { order_id } = req.query;
    const { status } = req.body;

    try {
        let order = await OrderModel.findOne({ _id: order_id });
        if (!order) {
            return res.status(404).json({ msg: 'Error finding product' })
        }
        order = await OrderModel.findByIdAndUpdate(
            { _id: order_id },
            { PaymentStatus: status },
            { new: true },
        )
        return res.status(200).json({ msg: 'order payment status updated', Order: order });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

router.post('/addCoupon', async (req, res, next) => {
    const {
        code,
        couponType,
        description,
        discount,
        minimumOrder,
        expiryDate,
        status
    } = req.body;
    try {
        let coupon = await CouponModel.create({
            code: code,
            couponType: couponType,
            amount: discount,
            description: description,
            minimumPurchase: minimumOrder,
            expiryDate: expiryDate,
            status: status,
            
        });
        if (!coupon) {
            return res.status(404).json({ success: false, msg: 'failed to add coupon' });
        }
        return res.status(200).json({ success: true, msg: 'Coupon added', coupon: coupon });
        
        
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

router.get('/getCoupon', async (req, res, next) => {
    try {
        const coupons = await CouponModel.find({});
        if (coupons) {
            return res.status(200).json({ success: true, msg: 'Coupons', coupon: coupons })
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

router.patch('/block-coupon', async (req, res, next) => {
    const { id } = req.query;
    
    try {
        let coupon = await CouponModel.findOne({ _id: id });
        if (!coupon) {
            return res.status(200).json({ success: false, msg: 'No coupon found' });
        }
        const couponstatus = coupon.status === 'Active' ? 'InActive' : 'Active'
        coupon = await CouponModel.updateOne(
            { _id: id },
            { status: couponstatus },
            { new: true },
        );
        if (coupon.modifiedCount === 0) {
            return next(new ErrorHandler('Coupon not found or already removed', 404));
        }
        
        return res.status(200).json({ success: true, msg: `coupon ${couponstatus}` })
    } catch (error) {
        
    }
});

router.delete('/delete-coupon', async (req, res, next) => {
    const { id } = req.query;
    
    try {
        let coupon = await CouponModel.findOne({ _id: id });
        if (!coupon) {
            return res.status(404).json({ success: false, msg: 'coupon not found' });

        }
        coupon = await CouponModel.deleteOne({ _id: id });
        if (coupon.deletedCount === 1) {
            return res.status(200).json({ success: true, msg: 'Coupon deleted' });

        }
        
       
    } catch (error) {
        
    }
});

router.get('/dashboard', async (req, res, next) => {
    try {
        let users = await UserModel.find({});
        users = users.length;
        let products = await ProductModel.find({});
        products = products.length;

        return res.status(200).json({ success: true, users: users, products, products })
    } catch (error) {
        return next(new ErrorHandler(error.message
            , 500
        ))
    }
});

router.post('/editproduct',Productupload.array('file'), async (req, res, next) => {
    const  productImage  = JSON.parse(req.body.productImage) ;
   
    const file = req.files;

    try {
        const { id } = req.query;
        const changedFields = JSON.parse(req.body.changedFields);
        
        if (productImage) {
            // console.log('before',productImage);
            const product = await ProductModel.findOne({ _id: id });
            const newImages = productImage.filter((img) => {
                return !product.productImage.includes(img)
            });
            // console.log('newimages', newImages);
            
            if (file) {
                const imageurl = file.map((img) => img.filename);
                for (let i = 0; i < newImages.length; i++) {
                    const index = productImage.indexOf(newImages[i]);
                    if (index !== -1) {
                        productImage[index] = imageurl[i];
                    }
                }
                await ProductModel.updateOne(
                    { _id: id },
                    {
                        $set: {
                            productImage: productImage,
                        }
                    }
                );

            }     
        }
        
        if (Object.keys(changedFields).length !== 0) {
            let item = await ProductModel.findOne({ _id: id });
            if (item) {
                const updateObject = {};
                
                for (let key in changedFields) {
                    if (key === 'colour' || key === 'fabric' || key === 'size') {
                        updateObject[`Details.${key}`] = changedFields[key];
                    } else {
                       
                        updateObject[key] = changedFields[key];
                    }
                }
                

                const result = await ProductModel.updateMany({ _id: id }, { $set: updateObject });
                

                if (result.modifiedCount === 1 && result.matchedCount === 1) {
                    return res.status(200).json({ success: true, msg: 'Product updated successfully!' })
                } else {
                    return res.status(500).json({ success: false, message: 'Failed to update product!' })
                }
            }
        } else {
            return next(new ErrorHandler('error', 500));
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

router.delete('/image', async (req, res, next) => {
    try {
        const { url, id } = req.query;
     
        if (url) {
            
            let product = await ProductModel.findOne({ _id: id });
            let isImage = product.productImage.includes(url);
            if (isImage === true) {
                product = await ProductModel.updateOne(
                    { _id: id },
                    {
                        $pull: {
                            productImage: url
                        }
                    }
                );
                if (product.modifiedCount === 1 && product.matchedCount == 1) {
                    const filePath = `Public/ProductImageuploads/${url}`;

                    fs.unlink(filePath, (err) => {
                        if (err) {
                            // console.log(err);
                            res.status(500).json({ message: "Error Deleting File" });
                        }
                    });
                    return res.status(200).json({ success: true, message: 'Image deleted!' })
                } else {
                    return res.status(500).json({ success: true, message: 'Error deletig image!' })

                }
            }

        } else {
            return next(new ErrorHandler('unexpected error', 500));
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

module.exports = router;
