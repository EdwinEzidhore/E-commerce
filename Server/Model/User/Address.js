const mongoose = require('mongoose');


const AddressSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    address:[ 
        {
            Name: {
                type:String  
              },
              phoneNumber: {
                  type: Number
              },
            state: {
                type: String
            },
            city: {
                type: String
            },
            main_address: {
                type: String
            },
            address2: {
                type: String
            },
            zipcode: {
                type: Number
            },
            addressType: {
                type: String
        },
        landmark: {
                type:String
        },
        locality: {
            type:String
        },
        alternate_phone: {
            type:Number
        }
        
            
        }],
    createdAt: {
        type: Date,
        default: Date.now()
    },


});

module.exports = mongoose.model("addres", AddressSchema);