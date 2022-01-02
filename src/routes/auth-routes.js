const express = require('express');
const router = express.Router();

const {
    signIn,
    signUp,
    profile,
    requireSignIn
} = require('../controllers/auth-controller');

const {
    validateSignUp,
    userValidation
}= require('../middlewares/validator/signUpValidator');





router.post('/signin', signIn);
router.post('/signup',validateSignUp, userValidation,signUp);




module.exports = router;