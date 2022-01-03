const express = require('express');
const router = express.Router();



const upload = require('../middlewares/uploader/productImageUploader/uploader');

const{
    createProduct,
    getProduct
}= require('../controllers/product-controller');
const { 
    requireSignIn, 
    adminMiddleware 
} = require('../middlewares/requireSignIn/requireSignIn');



router.post('/createproduct',requireSignIn,adminMiddleware, upload.array('productPictures'), createProduct);
router.get('/getproduct',getProduct);


module.exports = router;