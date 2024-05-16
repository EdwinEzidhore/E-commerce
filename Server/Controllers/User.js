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

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));


router.get('/featured', async (req, res, next) => {
    try {
        const products = await ProductModel.find({});
        if (products) {
        res.status(200).json(products);
    }
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
    

})




module.exports = router;