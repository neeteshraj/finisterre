const Cart = require('../models/cart-model');
const Product = require('../models/product-model');

const addItemToCart = function(req, res, next) {
    Cart.find({ user: req.user._id })
        .exec(function(err, cart) {
            if(err){
                return res.status(400).json({
                    messagge: "Error adding item to cart",
                    error:err
                })
            }
            else{
                const cart = new Cart({
                    user: req.user._id,
                    products: [req.body.products]
                });
                cart.save((err, cart) => {
                    if(err){
                        return res.status(400).json({
                            message: 'Error adding items to cart',
                            error: err
                        })
                    }
                    if(cart){
                        return res.status(201).json({
                            message: 'Items added to cart',
                            cart: cart
                        })
                    }
                })
            }
        })
}

module.exports={
    addItemToCart
}