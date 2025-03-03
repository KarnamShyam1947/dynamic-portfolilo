const express = require('express');
const router = express.Router();
const {
    addSkill,
    getAllSkills,
    getSkillsByCategory,
    deleteSkill
} = require('../controllers/skillController');
const verifyToken = require("./../middleware/authMiddleware")

// Skill routes
router.route('/')
    .post(verifyToken, addSkill)
    .get(getAllSkills);

router.route('/category/:category')
    .get(getSkillsByCategory);

router.route('/:id')
    .delete(verifyToken, deleteSkill);

module.exports = router;
