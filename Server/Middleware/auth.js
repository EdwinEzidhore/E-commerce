const ErrorHandler = require("../Utils/ErrorHandler");
const CatchAsyncErrors = require("./CatchAsyncErrors");
const jwt = require('jsonwebtoken');
const UserModel=require('../Model/User/User')

const isAuthenticated = CatchAsyncErrors(async (req, res, next) => {
    const {token} = req.cookies;
    
    // console.log(token);
    if (!token) {
        return next(new ErrorHandler("Please login to continue",401));
    
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    
    req.user = await UserModel.findById(decoded.id);
    next();

});


const localvariables = async (req,res,next) => {
    req.app.locals = {
        OTP: null,
        resetSession:false
    }
    next()
}

module.exports= {isAuthenticated,localvariables};