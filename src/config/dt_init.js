
const mongoose = require('mongoose');
require('dotenv').config();

const dbname = process.env.MONGODB_DB;
const username = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(
    `mongodb+srv://${username}:${password}@cluster0.a3cez.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }   
).then(() => console.log('Connected to MongoDB...'));
