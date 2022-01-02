const express = require('express');
const router = express.Router();


const {
    signIn,
    signUp,
    profile,
    requireSignIn
} = require('../../controllers/admin/auth-controller');





router.post('/signin', signIn);
router.post('/signup', signUp);




module.exports = router;