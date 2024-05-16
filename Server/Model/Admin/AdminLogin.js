const mongoose = require('mongoose');


const AdminLogin = new mongoose.Schema({
    email: String,
    password: {
        type: String,
        select: false
    }
});

module.exports = mongoose.model("Admin", AdminLogin);