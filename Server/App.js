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


const Allowedorigin= process.env.NODE_ENV == 'production' ?  'https://www.ezirefashion.store' : 'http://localhost:5173'

app.use(cors({
    origin:Allowedorigin,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
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


