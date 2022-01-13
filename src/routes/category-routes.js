const express = require('express');
const router = express.Router();


const upload = require('../middlewares/uploader/categoryImageUploader/uploader');
const{
    createCategory,
    getCategory
}= require('../controllers/category-controller');
const { 
    requireSignIn, 
    adminMiddleware 
} = require('../middlewares/requireSignIn/requireSignIn');



router.post('/createcategory',requireSignIn,adminMiddleware,upload.single('categoryImages'),createCategory);
router.get('/getcategory',getCategory);


module.exports = router;