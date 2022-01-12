const express = require('express');
const router = express.Router();


const {
    signIn,
    signUp,
    signOut
} = require('../../controllers/admin/auth-controller');

const { requireSignIn } = require('../../middlewares/requireSignIn/requireSignIn');

const {
    validateSignUp,
    validateSignIn,
    userValidation
}= require('../../middlewares/validator/signUpValidator');





router.post('/signin',validateSignIn,userValidation, signIn);
router.post('/signup',validateSignUp, userValidation, signUp);
router.post('/signout', signOut);




module.exports = router;