const express = require('express');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

exports.validateSignUp=[
    check('email')
        .normalizeEmail()
        .isEmail()
        .withMessage('Email is required'),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password is required')
        .isLength({min:6})
        .withMessage('Password must be at least 6 characters long'),
    check('firstName')
        .trim()
        .not()
        .isEmpty()
        .isLength({min:2})
        .withMessage('First name must be at least 2 characters long'),
    check('lastName')
        .trim()
        .not()
        .isEmpty()
        .isLength({min:2})
        .withMessage('Last name must be at least 2 characters long')
]


exports.validateSignIn=[
    check('email')
        .normalizeEmail()
        .isEmail()
        .withMessage('Email is required'),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password is required')
        .isLength({min:6})
        .withMessage('Password must be at least 6 characters long')
]

exports.userValidation=(req, res, next) => {
    const results = validationResult(req).array();
    if(results.length>0){
        return res.status(400).json({
            errors: results
        });
    }
    next();
}

