const express = require('express')

const signIn = function(req, res, next) {
    console.log("Signing in...");
} 

const signUp = function(req, res, next) {
    console.log("Signing up...");
}


module.exports = {
    signIn,
    signUp
}