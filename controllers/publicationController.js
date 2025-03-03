const Publication = require('../models/publicationModel');

// Add new publication
const addPublication = async (req, res) => {
    try {
        const publication = await Publication.create(req.body);
        
        res.status(201).json({
            success: true,
            data: publication
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Get all publications
const getAllPublications = async (req, res) => {
    try {
        const publications = await Publication.find().sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            count: publications.length,
            data: publications
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Update publication
const updatePublication = async (req, res) => {
    try {
        const publication = await Publication.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        
        if (!publication) {
            return res.status(404).json({
                success: false,
                error: 'Publication not found'
            });
        }

        res.status(200).json({
            success: true,
            data: publication
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Delete publication
const deletePublication = async (req, res) => {
    try {
        const publication = await Publication.findByIdAndDelete(req.params.id);
        
        if (!publication) {
            return res.status(404).json({
                success: false,
                error: 'Publication not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Publication deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    addPublication,
    getAllPublications,
    updatePublication,
    deletePublication
};
