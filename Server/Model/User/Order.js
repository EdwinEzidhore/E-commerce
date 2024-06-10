const mongoose = require('mongoose');
const User = require('../../Model/User/User')
const products=require('../../Model/Admin/AdminAddProduct')

const OrderModel = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: products,
                required:true,
            },
            price: {
                type: Number,
                required:true,
            },
            quantity: {
                type: Number,
                required:true,
            }
        }
    ],
    orderDate: {
        type: Date,
        default:Date.now(),
    },
    totalAmount: {
        type: Number,
        required: true,
        
    },
    OrderStatus: {
        type: String,
        enum: ['Order Placed', 'Shipped', 'Delivered', "Cancelled", 'Returned'],
        default:'Order Placed'
    },
    PaymentStatus: {
        type: String,
        enum: ['Pending', 'Success', 'Failed'],
        default:'Pending',
    },
    paymentMethod: {
        type: String,
        
        // required:true,
    },
    razorpay_order_id: {
        type: String,
        // required: true,
    },
    razorpay_payment_id: {
        type: String,
        // required: true,
    },
    razorpay_signature: {
        type: String,
        // required: true,
    },
    Address: {
        type: Object,
        required:true,
    },
    cancelReason: {
        type:String,
    },
    returnReason: {
        type:String
    }
});

module.exports = mongoose.model('order', OrderModel);