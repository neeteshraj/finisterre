const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    slug:{
        type: String,
        required: true,
        unique: true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    offers:{
        type: Number,
    },
    productPictures:[
        {img:{
            type: String
        }}
    ],
    reviews:[
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref:'User'
            },
            review:{
                type: String
            }
        }
    ],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    updatedAt:{
        type: Date
    }
},{timestamps: true});


const Product = mongoose.model('Product', productSchema);

module.exports=Product;