const Certificate = require('../models/certificateModel');

// Add new certificate
const addCertificate = async (req, res) => {
    try {
        const { title, issuer, duration, skills, certificateLink } = req.body;
        
        // Convert comma-separated skills string to array
        const skillsArray = skills.split(',').map(skill => skill.trim());
        
        const certificate = await Certificate.create({
            title,
            issuer,
            duration,
            skills: skillsArray,
            certificateLink
        });
        
        res.status(201).json({
            success: true,
            data: certificate
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Get all certificates
const getAllCertificates = async (req, res) => {
    try {
        const certificates = await Certificate.find().sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            count: certificates.length,
            data: certificates
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Delete certificate
const deleteCertificate = async (req, res) => {
    try {
        const certificate = await Certificate.findByIdAndDelete(req.params.id);
        
        if (!certificate) {
            return res.status(404).json({
                success: false,
                error: 'Certificate not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Certificate deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    addCertificate,
    getAllCertificates,
    deleteCertificate
};
