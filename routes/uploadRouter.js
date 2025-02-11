// routes/uploadRoutes.js
const express = require('express');
const { 
    parser,
    uploadSingle,
    uploadMultiple
} = require('../controllers/uploadController');

const UploadRouter = express.Router();

UploadRouter.post('/upload-single',  parser.single('mainImage'), uploadSingle);
UploadRouter.post('/upload-multiple',  parser.array('images', 5), uploadMultiple);

module.exports = UploadRouter;
