const express = require('express');
const router = express.Router();


const upload = require('../middlewares/uploader/productImageUploader/uploader');
const{
    createCategory,
    getCategory
}= require('../controllers/category-controller');
const { 
    requireSignIn, 
    adminMiddleware 
} = require('../middlewares/requireSignIn/requireSignIn');



router.post('/createcategory',requireSignIn,adminMiddleware,upload.array('productPictures'),createCategory);
router.get('/getcategory',getCategory);


module.exports = router;