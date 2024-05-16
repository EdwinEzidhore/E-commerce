const express = require('express');
const ErrorHandler = require("./Middleware/Error");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use('/', express.static('uploads'));
app.use(express.static('Public/ProductImageuploads'));

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true,
}));

app.use(bodyParser.urlencoded({ extended: true }));

//user
const user = require("./Controllers/User");
app.use('/api/v2', user);

//Admin
const Admin = require('./Controllers/Admin/Admin');
app.use('/', Admin);


//Middleware
app.use(ErrorHandler);

module.exports = app;

