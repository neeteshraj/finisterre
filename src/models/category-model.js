const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug:{
        type: String,
        required: true,
        unique: true
    },
    parentId:{
        type: String
    },
    categoryImages:{
        type: String
    },
    type:{
        type: String
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true});


const Category = mongoose.model('Category', categorySchema);
module.exports = Category;