const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must Provide a Name']
    },
    email: {
        type: String,
        required: [true, 'Must Provide an Email']
    },
    password: {
        type: String,
        required: [true, 'Please enter your Password'],
        minLength: [5, "Password must contain atleast 5 characters"],
        select: false //to avoid retreiving password when using on client side
    },
    role: {
        type: String,
        default: 'user'
    },
    avatar: {
        public_id: {
            type: String,
            required: false
        },
        url: {
            type: String,
            required: false
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    status:{
        type: Boolean,
        default:false,
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'addres'
    },
    resetPasswordToken: String,
    resetPasswordTime: Date

});


//password encryption
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    this.password=await bcrypt.hash(this.password,10)
})


//jwt token
UserSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn:process.env.JWT_EXPIRES
    });
}

//password checking
UserSchema.methods.ComparePassword =async function (enteredpassword) {
    return await bcrypt.compare(enteredpassword, this.password);
}


module.exports = mongoose.model("User", UserSchema);