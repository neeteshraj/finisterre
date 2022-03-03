const router = require('express').Router();

const adminRoute = require('./admin/auth-routes');
const userRoute = require('./auth-routes');
const categoryRoute = require('./category-routes');
const productRoute = require('./product-routes');
const cartRoute = require('./cart-routes');
const initialDataRoute = require('./admin/initialData-routes');

router.use('/admin', adminRoute);
router.use('/user', userRoute);
router.use('/category', categoryRoute);
router.use('/product', productRoute);
router.use('/cart', cartRoute);
router.use('/admin', initialDataRoute);

module.exports = router;