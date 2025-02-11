const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    issuer: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    certificateLink: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);
