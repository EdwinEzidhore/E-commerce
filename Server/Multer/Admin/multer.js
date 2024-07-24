const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null,'Public/ProductImageuploads')
    },
    filename: function (req, file, cb) {
        // console.log('multer',file);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        const filename = file.originalname.split(".")[0];
        const extension = path.extname(file.originalname); 
        
        cb(null, filename + '-' + uniqueSuffix + extension)
      }
})

const Productupload = multer({ storage: storage });
module.exports = Productupload;


