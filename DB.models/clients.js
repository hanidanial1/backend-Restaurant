const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },

    admin: {
        type: Boolean,
        default: false,
    },
    status: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
