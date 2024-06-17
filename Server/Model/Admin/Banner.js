const mongoose = require('mongoose');

const Banner = new mongoose.Schema({
    title:{
        type:String
    },
    description: {
    type:String,
    },
    startDate: {
        
    },
    endDate: {
        
    },
    
});

module.exports = mongoose.model('banner', Banner);
