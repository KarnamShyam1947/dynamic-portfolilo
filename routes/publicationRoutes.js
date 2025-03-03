const express = require('express');
const router = express.Router();
const {
    addPublication,
    getAllPublications,
    updatePublication,
    deletePublication
} = require('../controllers/publicationController');
const verifyToken = require("./../middleware/authMiddleware")

// Publication routes
router.route('/')
    .post(verifyToken, addPublication)
    .get(getAllPublications);

router.route('/:id')
    .put(verifyToken, updatePublication)
    .delete(verifyToken, deletePublication);

module.exports = router;
