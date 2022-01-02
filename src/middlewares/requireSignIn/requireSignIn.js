const jwt = require('jsonwebtoken');


const requireSignIn = function(req, res, next) {
    if(req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
    }
    else{
        return res.status(400).json({
           message: 'Authorization required'
       })
    }
    next();
}

const userMiddleware = function(req, res, next) {
    if(req.user.role !== 'user') {
        return res.status(401).json({
            message: 'You are not authorized to perform this action'
        })
    }
    next();
}

const adminMiddleware = function(req, res, next) {
    if(req.user.role !== 'admin') {
        return res.status(401).json({
            message: 'You are not authorized to perform this action'
        })
    }
    next();
}


module.exports = {
    requireSignIn,
    userMiddleware,
    adminMiddleware
}