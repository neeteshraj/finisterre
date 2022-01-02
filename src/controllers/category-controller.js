const express = require('express');
const CategoryModel = require('../models/category-model');
const slugify = require('slugify');


function createCategories(categories, parentId = null) {
    const categoryList = [];
    let category;
    if(parentId==null) {
        category = categories.filter(cat => cat.parentId == undefined);
    }
    else {
        category = categories.filter(cat=>cat.parentId == parentId);
    }
    for(let cate of category){
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            children: createCategories(categories, cate._id)
        })
    }
    return categoryList;
}

const createCategory = function(req, res, next) {
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name, {lower: true})
    }
    if(req.body.parentId){
        categoryObj.parentId=req.body.parentId;
    }

    const category = new CategoryModel(categoryObj);
    category.save(function(err, category) {
        if(err) {
            return res.status(500).json({
                message: 'Error when creating category',
                error: err
            })
        }
        if(category){
            return res.status(200).json({
                message: 'Category created successfully',
                category: category
            })
        }
    })
}

const getCategory = function(req, res, next) {
    CategoryModel.find({})
        .exec(function(err, categories){
            if(err){
                return res.status(500).json({
                    message: 'Error when getting categories',
                    error: err
                })
            }
            if(categories){

                const categoryList = createCategories(categories);


                return res.status(200).json({
                    message: 'Categories retrieved successfully',
                    categories: categoryList
                })
            }
        })
}


module.exports = {
    createCategory,
    getCategory
}




