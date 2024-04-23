const ErrorHandler = require("../Utils/ErrorHandler");

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //wrong mongodb id error
    if (err.name === 'CastError') {
        const message = `Resource not found with this Id ${err.path}`;
        err = new ErrorHandler(message, 400);//doubt err?
    }

    //duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate key ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    //Wrong JWT
    if (err.name === 'JsonWebTokenError') {
        const message = `Your URL is Invalid`;
        err = new ErrorHandler(message, 400);
        
    }
    
    //jwt exxpired error
    if (err.name === "TokenExpiredError") {
        const message = "Your URL is expired"
        err = new ErrorHandler(message, 400);
    }
    res.status(err.statusCode).json({
        success: false,
        message:err.message
    })
};