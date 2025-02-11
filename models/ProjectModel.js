const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Schema for the "moreInfo" part, as it contains sub-documents
const photoSchema = new Schema({
    imageUrl: { 
        type: String, 
        required: true 
    },
    imageSubTitle: { 
        type: String, 
        required: true 
    }
});

const moreInfoSchema = new Schema({
    description: { 
        type: String, 
        required: true 
    },
    skills: [
        { 
            type: String, 
            required: true 
        }
    ],
    photos: [photoSchema]
});

// Define the main Schema for the project
const projectModelSchema = new Schema({
    title: { 
        type: String, 
        required: true 
    },
    subTitle: { 
        type: String, 
        required: true 
    },
    liveDemo: { 
        type: String, 
        required: true 
    },
    cssClass: [
        { 
            type: String, 
            required: true 
        }
    ],
    photoUrl: { 
        type: String, 
        required: true 
    },
    moreInfo: { 
        type: moreInfoSchema, 
        required: true 
    }
}, 
{
    collection: 'Projects',
    timestamps: true
});

// Create the model based on the schema
const ProjectModel = mongoose.model('ProjectModel', projectModelSchema);

module.exports = ProjectModel;
