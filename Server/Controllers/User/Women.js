const express = require('express');
const router = express.Router();
const ErrorHandler = require('../../Utils/ErrorHandler');
const ProductModel = require('../../Model/Admin/AdminAddProduct');



router.get('/women', async (req, res, next) => {
   try {
       const item = await ProductModel.findOne({});
       res.json(item)
   } catch (error) {
       return next(new ErrorHandler(error.message, 500));
   } 
});

module.exports = router;
