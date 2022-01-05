const Cart = require('../models/cart-model');

const addItemToCart = function(req, res, next) {
    Cart.find({ user: req.user._id })
        .exec(function(err, cart) {
            if(err){
                return res.status(400).json({
                    error: err
                })
            } 
            if(cart){
                //if cart already exists, add the new item to the cart or update the existing item
                const product = req.body.cartItems.product;
                const item = cart.cartItems.find((c)=>c.product == product);
                if(item){
                    Cart.findOneAndUpdate({"user": req.user._id,"cartItems.product":product},{
                        "$set":{
                            "cartItems": {
                                ...req.body.cartItems,
                                quantity: item.quantity + req.body.cartItems.quantity
                            }
                        }
                    })
                        .exec(function(err, _cart){
                            if(err){
                                return res.status(400).json({
                                    message: "Error adding item to cart",
                                    error: err
                                })
                            }
                            if(_cart){
                                return res.status(201).json({
                                    message: "Item added to cart",
                                    cart: _cart
                                })
                            }
                        })
                }
                else{
                    Cart.findOneAndUpdate({user: req.user._id},{
                        "$push":{"cartItems": req.body.cartItems}
                    })
                        .exec(function(err, _cart){
                            if(err){
                                return res.status(400).json({
                                    message: "Error adding item to cart",
                                    error: err
                                })
                            }
                            if(_cart){
                                return res.status(201).json({
                                    message: "Item added to cart",
                                    cart: _cart
                                })
                            }
                        })
                }
                
            }
            else{
                //if cart doesnot exists then create a new cart
                const cart = new Cart({
                    user: req.user._id,
                    cartItems: [req.body.cartItems]
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

module.exports = {
    addItemToCart
}