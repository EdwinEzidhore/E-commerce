const mongoose = require('mongoose');



const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        
    },
    description: {
        type:String,
    },
    brand: {
        type:String,
    },
    productImage: {
        
        type: Array
        
    },
    Details: 
        {
            fabric: {
                type:String
            },
            colour: {
                type:String
            },
            size: {
                type:String
            },
          
        }
    ,
    
    originalPrice: {
        type:Number,
    },
    sellingPrice: {
        type:Number,
    },
    category: {
        type:String,
    },
    status: {
        type: String,
        enum: ['Available', 'Unavailable'],
        // default: true,
       
    },
    stock: {
        type:Number
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model("product", ProductSchema);