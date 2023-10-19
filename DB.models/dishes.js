
const mongoose = require('mongoose');


const dishSchema = new mongoose.Schema({
    img: {
        type: String,
        default: '',
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name should be at least 3 characters long'],
        maxlength: [50, 'Name should not exceed 50 characters'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price should be a positive number'],
    },
    status: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
