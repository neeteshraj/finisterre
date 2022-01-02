const router = require('express').Router();

const adminRoute = require('./admin/auth-routes');
const userRoute = require('./auth-routes');


router.use('/admin', adminRoute);
router.use('/user', userRoute);

module.exports = router;