const express = require('express');
const UserModel = require('../models/user-model');
const jwt = require('jsonwebtoken');

 
const signUp = function(req, res, next) {
    UserModel.findOne({email: req.body.email})
        .exec(function(err, user) {
            if(user) return res.status(400).json({
                message: "User already exists"
            })
        })
    const {
        email,
        password,
        firstName,
        lastName
    } = req.body;

    const user = new UserModel({
        username: Math.random().toString(),
        email,
        password,
        firstName,
        lastName
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
                message: "User created successfully"
            });
        }
    })

    // console.log(user);
}


const signIn = function(req, res, next) {
    UserModel.findOne({email: req.body.email})
        .exec(function(err, user) {
            if(err) return res.status(400).json({err});
            if(user){
                if(user.authenticate(req.body.password) && user.role === 'user'){
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
                        message: "User signed in successfully"
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

//this is dashboard, displayed when login is sucessfull
const profile = function(req, res, next) {
    console.log(req.user);
}



module.exports = {
    signIn,
    signUp,
    profile
}