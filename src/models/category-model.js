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
        type: mongoose.Schema.Types.ObjectId
    },
    categoryImages:{
        type: String
    }
},{timestamps: true});


const Category = mongoose.model('Category', categorySchema);
module.exports = Category;