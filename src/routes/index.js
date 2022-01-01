const router = require('express').Router();

const userRoute = require('../routes/user-routes');


router.use('/users', userRoute);

module.exports = router;