
const express = require('express');
const ErrorHandler = require("./Middleware/Error");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();


const allowedOrigins = [
  'http://localhost:5173',         
  'https://ezirefashionstore-edwin-ezidhores-projects.vercel.app/'     
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


app.use('/', express.static('uploads'));
app.use(express.static('Public/ProductImageuploads'));
app.use(express.json());
app.use(cookieParser());




app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  //  console.log("hello");
   res.send("Server is running!");
})


//user
const user = require("./Controllers/User");
app.use('/api/v2', user);

//Admin
const Admin = require('./Controllers/Admin/Admin');
app.use('/', Admin);


//Middleware
app.use(ErrorHandler);

module.exports = app;


