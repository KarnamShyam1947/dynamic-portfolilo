const express = require('express');
const router = express.Router();
const {
    addEducation,
    getAllEducation,
    updateEducation,
    deleteEducation
} = require('../controllers/educationController');
const verifyToken = require("./../middleware/authMiddleware")

// Education routes
router.route('/')
    .post(verifyToken, addEducation)
    .get(getAllEducation)

router.route("/:id")
    .put(verifyToken, updateEducation)
    .delete(verifyToken, deleteEducation);

module.exports = router;
