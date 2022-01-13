const express = require('express');
const Product = require('../models/product-model');
const slugify = require('slugify');
const shortid = require('shortid');


const createProduct= (req, res) => {
    const { 
        name,
        description,
        price,
        category,
        quantity,
        createdBy
    } = req.body;

    let productPictures =[];

    if(req.files.length > 0) {
        productPictures = req.files.map(file=>{
            return { img: file.filename};
        });
    }

    const product = new Product({
        name: name,
        slug: slugify(name),
        description: description,
        price: price,
        category: category,
        quantity: quantity,
        productPictures: productPictures,
        createdBy: req.user._id
    });
    product.save((err, product) => {
        if(err) {
            return res.status(400).json({
                message: 'Product not created',
                error: err
            })
        }
        if(product){
            res.status(201).json({
                message: 'Product created successfully',
                product: product
            })
        }
    })
        
}

const getProduct= (req, res) => {
    console.log('Getting Product')
}

module.exports = {
    createProduct,
    getProduct
}




