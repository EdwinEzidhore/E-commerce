const mongoose = require('mongoose');


const WishlistModel = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        
    },
    products: [
        {
            productID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
            }
        },
    ]
});

module.exports = mongoose.model('wishlist', WishlistModel);