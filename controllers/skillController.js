const Skill = require('../models/skillModel');

// Add new skill
const addSkill = async (req, res) => {
    try {
        const skill = await Skill.create(req.body);
        
        res.status(201).json({
            success: true,
            data: skill
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Get all skills
const getAllSkills = async (req, res) => {
    try {
        const skills = await Skill.find().sort({ category: 1, name: 1 });
        
        // Group skills by category
        const groupedSkills = skills.reduce((acc, skill) => {
            if (!acc[skill.category]) {
                acc[skill.category] = [];
            }
            acc[skill.category].push(skill.name);
            return acc;
        }, {});

        res.status(200).json({
            success: true,
            data: groupedSkills
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Get skills by category
const getSkillsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const skills = await Skill.find({ category }).sort({ name: 1 });
        
        res.status(200).json({
            success: true,
            count: skills.length,
            data: skills.map(skill => skill.name)
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Delete skill
const deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.findByIdAndDelete(req.params.id);
        
        if (!skill) {
            return res.status(404).json({
                success: false,
                error: 'Skill not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Skill deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    addSkill,
    getAllSkills,
    getSkillsByCategory,
    deleteSkill
};
