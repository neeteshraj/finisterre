const express = require('express');
const router = express.Router();

const{
    createCategory,
    getCategory
}= require('../controllers/category-controller');
const { 
    requireSignIn, 
    adminMiddleware 
} = require('../middlewares/requireSignIn/requireSignIn');



router.post('/createcategory',requireSignIn,adminMiddleware,createCategory);
router.get('/getcategory',getCategory);


module.exports = router;