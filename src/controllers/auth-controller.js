const express = require('express');
const UserModel = require('../models/user-model');
const jwt = require('jsonwebtoken');

 
const signUp = function(req, res) {
    User.findOne({ email: req.body.email }).exec(async (error, user) => {
        if (user)
          return res.status(400).json({
            error: "User already registered",
          });
    
        const { firstName, lastName, email, password } = req.body;
        const hash_password = await bcrypt.hash(password, 10);
        const _user = new UserModel({
          firstName,
          lastName,
          email,
          hash_password,
          username: shortid.generate(),
        });
    
        _user.save((error, user) => {
          if (error) {
            return res.status(400).json({
              message: "Something went wrong",
            });
          }
    
          if (user) {
            const token = generateJwtToken(user._id, user.role);
            const { _id, firstName, lastName, email, role, fullName } = user;
            return res.status(201).json({
              token,
              user: { _id, firstName, lastName, email, role, fullName },
            });
          }
        });
      });

    // console.log(user);
}


const signIn = function(req, res) {
    UserModel.findOne({email: req.body.email})
        .exec(function(err, user) {
            if(err) return res.status(400).json({err});
            if(user){
                if(user.authenticate(req.body.password) && user.role === 'user'){
                    const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET,{
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

module.exports = {
    signIn,
    signUp
}