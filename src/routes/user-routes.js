const express = require('express');
const router = express.Router();


const {
    signIn,
    signUp
} = require('../controllers/user-controller');





router.post('/signin', signIn);
router.post('/signout', signUp);



module.exports = router;