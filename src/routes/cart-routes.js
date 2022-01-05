const express = require('express');
const router = express.Router();


const { 
    requireSignIn, 
    userMiddleware 
} = require('../middlewares/requireSignIn/requireSignIn');
// const{
//     getBucket,
//     updateBucket,
//     addProductToBucket
// } = require('../controllers/bucket-controller');
const{
    addItemToCart
}= require('../controllers/cart-controller');



router.post('/add-to-cart',requireSignIn,userMiddleware, addItemToCart);


module.exports = router;