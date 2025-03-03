const cloudinary = require('./../config/CloudinaryConfig');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'dynamic-portfolio',
    format: async (req, file) => 'png', 
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});
 
const parser = multer({ storage: storage });

const uploadMultiple = (req, res) => {
  try {
    const imageUrls = req.files ? req.files.map(file => file.path) : [];

    return res.status(200).json({
      'images' : imageUrls
    })
  } catch (error) {
    return res.status(500).json({
      "error" : "Error While Process :->"+error
    })
  }  
};

const uploadSingle = (req, res) => {
  try {
    const mainImageUrl = req.file ? req.file.path : null;

    return res.status(200).json({
      'mainImage' : mainImageUrl
    })
  } catch (error) {
    return res.status(500).json({
      "error" : "Error While Process :->"+error
    })
  }  
};

module.exports = {
  parser,
  uploadSingle,
  uploadMultiple
}
