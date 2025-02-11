const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
    title: {
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
    },
    githubLink: {
        type: String,
        default: ''
    },
    paperLink: {
        type: String,
        default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('Publication', publicationSchema);
