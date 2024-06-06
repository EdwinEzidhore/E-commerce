const mongoose = require('mongoose');

const CartModel = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    products: [
        {
            productID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
               
            },
            quantity: {
                type: Number,
            },
           
        }

    ],
    TotalAmount: {
        type:Number,
    }
   
});

module.exports = mongoose.model('cart', CartModel);