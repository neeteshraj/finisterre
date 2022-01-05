const Cart = require('../models/cart-model');
const Product = require('../models/product-model');

const Promise = require('bluebird');

const { ForbiddenError, NotFoundError, ValidationError } = require('../errors');
const { ResponseHandlerUtil } = require('../utils');

    


async function getBucket(req, res, next) {
    const { userId } = req.params;
    try {
      if (userId !== req.user._id) {
        throw new ForbiddenError('You\'re not allowed to view this resource');
      }
      const userBucket = await Cart.findOne({ userId }).populate('products.productId');
      if (!userBucket) {
        throw new NotFoundError(`Bucket for user with id = ${userId} not found.`);
      }
  
      return ResponseHandlerUtil.handleGet(res, userBucket);
    } catch (error) {
      return next(error);
    }
  }
  
  async function updateBucket(req, res, next) {
    const { productIds } = req.body;
    const { userId } = req.params;
  
    try {
      if (userId !== req.userData._id) {
        throw new ForbiddenError('You\'re not allowed to view this resource');
      }
  
      const bucket = await Cart.findOne({
        userId,
        'products.productId': {
          $in: productIds,
        },
      }).populate('products.productId');
  
      let decreaseAmount = 0;
  
      await Promise.map(bucket.products, async (product) => {
        if (productIds.includes(product.productId._id.toString())) {
          decreaseAmount += product.productId.price * product.quantity;
        }
      });
  
      return ResponseHandlerUtil.handleDelete(res, bucket);
    } catch (error) {
      return next(error);
    }
  }
  
  async function addProductToBucket(req, res, next) {
    const { userId: paramsUserId, productId, quantity} = req.body;
    const { userId } = req.params;
    

    if (paramsUserId !== userId) {
      throw new ValidationError('User is not allowed to do this action');
    }
  
    try {
      const product = await Product.findOne({ _id: productId });
      if (!product) {
        throw new NotFoundError('Product not found');
      }
  
      if (product.quantity < quantity) {
        throw new ValidationError('Product not available in that quantity');
      }
  
      const currentBucketData = await Cart.findOne({ userId });
      if (!currentBucketData) {
        const createData = {
          userId,
          products: [{
            productId,
            quantity,
          }],
          totalPrice: quantity * product.price,
        };
        const bucketDoc = await Cart.create(createData);
        return ResponseHandlerUtil.handleCreate(res, bucketDoc);
      }
  
      const pickedProduct = currentBucketData.products.find(
        (prod) => prod.productId.toString() === productId
      );
  
      const increaseAmount = product.price * quantity;
      if (pickedProduct) {
        pickedProduct.quantity += quantity;
        currentBucketData.totalPrice += increaseAmount;
      } else {
        currentBucketData.products.push({ productId, quantity });
        currentBucketData.totalPrice += increaseAmount;
      }
  
      const bucketData = await currentBucketData.save();
  
      return ResponseHandlerUtil.handleCreate(res, bucketData);
    } catch (error) {
      return next(error);
    }
  }
  




module.exports = {
    getBucket,
    updateBucket,
    addProductToBucket
}