const express = require('express');
const router = express.Router();

const {
    signIn,
    signUp
} = require('../controllers/auth-controller');

const {
    validateSignUp,
    validateSignIn,
    userValidation
}= require('../middlewares/validator/signUpValidator');





router.post('/signin', validateSignIn, userValidation, signIn);
router.post('/signup',validateSignUp, userValidation,signUp);




module.exports = router;