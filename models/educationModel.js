const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    course: {
        type: String,
        required: true
    },
    institute: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Education', educationSchema);
