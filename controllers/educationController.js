const Education = require('../models/educationModel');

// Add new education
const addEducation = async (req, res) => {
    try {
        const education = await Education.create(req.body);
        
        res.status(201).json({
            success: true,
            data: education
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Get all education entries
const getAllEducation = async (req, res) => {
    try {
        const education = await Education.find().sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            count: education.length,
            data: education
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Update education
const updateEducation = async (req, res) => {
    try {
        const education = await Education.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        
        if (!education) {
            return res.status(404).json({
                success: false,
                error: 'Education entry not found'
            });
        }

        res.status(200).json({
            success: true,
            data: education
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Delete education
const deleteEducation = async (req, res) => {
    try {
        const education = await Education.findByIdAndDelete(req.params.id);
        
        if (!education) {
            return res.status(404).json({
                success: false,
                error: 'Education entry not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Education entry deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    addEducation,
    getAllEducation,
    updateEducation,
    deleteEducation
};
