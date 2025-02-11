const express = require('express');
const router = express.Router();
const {
    addCertificate,
    getAllCertificates,
    deleteCertificate
} = require('../controllers/certificateController');
const verifyToken = require("./../middleware/authMiddleware")

// Certificate routes
router.post('/', verifyToken, addCertificate);
router.get('/', getAllCertificates);
router.delete('/:id', verifyToken, deleteCertificate);

module.exports = router;
