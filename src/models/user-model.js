const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    }
})

const User = mongoose.model('User', userSchema);

export default User;
