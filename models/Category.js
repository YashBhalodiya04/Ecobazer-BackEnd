const mongoose = require("mongoose");
const {Schema} = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    image:{
        type: String,
        required: true
    },
    products: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
    }]
})

const Category = mongoose.model('Category', categorySchema);
module.exports = Category