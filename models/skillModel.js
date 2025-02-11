const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: ['Languages', 'frameworks', 'Tools', 'Others']
    },
    name: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
