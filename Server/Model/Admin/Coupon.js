const mongoose = require('mongoose');

const CouponModel = new mongoose.Schema([{
    code: {
        type:String,
    },
    couponType: {
        type: String,
        required:true,
    },
    amount: {
        type:Number,
        required:true,
    },
    description: {
        type: String,
        
    },
    minimumPurchase: {
        type: Number,
        required:true
    },
    expiryDate: {
        type: Date,
        required:true,
    },
    status: {
        type: String,
    
        default:'Active'
    },
    redeemed: [
        {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'user',
        },
        status: {
            type: String,
            default:false,
        }
        }
    ]
}]);

CouponModel.pre('save', function(next) {
   
    if (this.code && typeof this.code === 'string') {
        this.code = this.code.toUpperCase(); 
    }
    next();
});

module.exports = mongoose.model('coupon', CouponModel);