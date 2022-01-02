const express = require('express');
const UserModel = require('../../models/user-model');
const jwt = require('jsonwebtoken');

 
const signUp = function(req, res, next) {
    UserModel.findOne({email: req.body.email})
        .exec(function(err, user) {
            if(user) return res.status(400).json({
                message: "Admin already exists"
            })
        })
    const {
        email,
        password,
        firstName,
        lastName,
    } = req.body;

    const user = new UserModel({
        username: Math.random().toString(),
        email,
        password,
        firstName,
        lastName,
        role: 'admin'
    });
    user.save(function(err, data) {
        if(err){
            return res.status(400).json({
                message: "Something went wrong",
                err
            });
        }

        if(data){
            return res.status(200).json({
                message: "Admin created successfully"
            });
        }
    })

    
}


const signIn = function(req, res, next) {
    UserModel.findOne({email: req.body.email})
        .exec(function(err, user) {
            if(err){ 
                return res.status(400).json({err})
            };
            if(user){
                if(user.authenticate(req.body.password) && user.role === 'admin'){
                    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET,{
                        expiresIn: process.env.JWT_SECRET_EXPIRATION
                    });
                    const {
                        _id,
                        firstName,
                        lastName,
                        email,
                        role,
                        fullName
                    } = user;
                    return res.status(200).json({
                        token,
                        user: {
                            _id,
                            firstName,
                            lastName,
                            email,
                            role,
                            fullName
                        },
                        message: "Admin signed in successfully"
                    });
                }
                else{
                    return res.status(400).json({
                         message: 'Invalid password'
                    })
                }
            }
            else{
                return res.status(400).json({
                    message: "Something went wrong"
                });
            }
        })
}


const profile = function(req, res, next) {
    console.log(req.user);
}


//this is middleware, it needs to placed in middlewares directory
const requireSignIn = function(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
}


module.exports = {
    signIn,
    signUp,
    requireSignIn,
    profile
}