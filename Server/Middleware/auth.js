const ErrorHandler = require("../Utils/ErrorHandler");
const CatchAsyncErrors = require("./CatchAsyncErrors");
const jwt = require('jsonwebtoken');
const UserModel=require('../Model/User/User')

const isAuthenticated = CatchAsyncErrors(async (req, res, next) => {
    const {token} = req.cookies;
    

    if (!token) {
        return next(new ErrorHandler("Please login to continue"), 401);
    
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    
    req.user = await UserModel.findById(decoded.id);
    next();

});

module.exports= isAuthenticated;