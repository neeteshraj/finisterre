const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    },
    username:{
        type: String,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hash_password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ["admin","user"],
        default: "user"
    },
    contactNumber: Number,
    dateOfBirth:{
        type: Date
    },
    age:{
        type: Number
    },
    profilePicture:{
        type: String
    },
    billingAddress:{
        type: String
    },
    shippingAddress:{
        type: String
    }


},{timestamps: true});


userSchema.virtual('fullName')
    .get(function(){
        return `${this.firstName} ${this.lastName}`;
    })

// userSchema.virtual('password')
//     .set(function(password){
//         this.hash_password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
//     })

userSchema.methods = {
    authenticate: async function (password) {
      return await bcrypt.compare(password, this.hash_password);
    },
  };

const User = mongoose.model('User', userSchema);

module.exports = User;
