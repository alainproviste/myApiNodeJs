const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('Product', productSchema);