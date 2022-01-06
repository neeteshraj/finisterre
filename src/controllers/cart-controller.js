const Cart = require('../models/cart-model');

const addItemToCart = function (req, res, next) {
    Cart.findOne({ user: req.user._id })
        .exec(async function (err, cart) {
            if (err) {
                return res.status(400).json({
                    err
                })
            }
            if (cart) {
                //if cart already exists, add the new item to the cart or update the existing item
                const { product, quantity } = req.body.cartItems;
                const item = cart.cartItems.find(c => c.product == product);
                if (item) {
                    item.quantity = quantity
                    cart.cartItems.map(c => {
                        if (c.product == item.product) { return { ...c, ...item } }
                        return item
                    })
                    await cart.save()
                    return res.status(201).json({ message: "item updated to cart", })
                } else {
                    cart.cartItems.push({ product, quantity })
                    await cart.save()
                    return res.status(201).json({ message: "new item added to cart", })
                }

                let condition, update;
                // if (item) {
                //     condition = { "user": req.user._id, "cartItems.product": product };
                //     update = {
                //         "$set": {
                //             "cartItems.$": {
                //                 ...req.body.cartItems,
                //                 quantity: item.quantity + req.body.cartItems.quantity
                //             }
                //         }
                //     }

                // }
                // else {
                //     condition = { "user": req.user._id };
                //     update = {
                //         "$push": {
                //             "cartItems": req.body.cartItems
                //         }
                //     }
                //     Cart.findOneAndUpdate(condition, update)
                //         .exec(function (err, _cart) {
                //             if (err) {
                //                 return res.status(400).json({
                //                     message: "Error adding item to cart",
                //                     error: err
                //                 })
                //             }
                //             if (_cart) {
                //                 return res.status(201).json({
                //                     message: "Item added to cart",
                //                     cart: _cart
                //                 })
                //             }
                //         })
                // }

            }
            else {
                //if cart doesnot exists then create a new cart
                const cart = new Cart({
                    user: req.user._id,
                    cartItems: [req.body.cartItems]
                });
                cart.save((err, cart) => {
                    if (err) {
                        return res.status(400).json({
                            message: 'Error adding items to cart',
                            error: err
                        })
                    }
                    if (cart) {
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