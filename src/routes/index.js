const router = require('express').Router();

const adminRoute = require('./admin/auth-routes');
const userRoute = require('./auth-routes');
const categoryRoute = require('./category-routes');


router.use('/admin', adminRoute);
router.use('/user', userRoute);
router.use('/category', categoryRoute);

module.exports = router;