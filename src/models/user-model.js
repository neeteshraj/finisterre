const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true,
        unique: true
    },
    gender:{
        type: String,
        enum:["Male","Female","Other"]
    },
    billingaddress:{
        type: String,
        required: true
    },
    shippingaddress:{
        type: String,
        required: true
    }
})

const User = mongoose.model('User', userSchema);

export default User;
