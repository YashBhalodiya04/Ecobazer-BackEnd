const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
var cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  //   folder: "images",
  allowedFormats: ["jpg", "png", "gif", "jpeg"],
  // transformation: [{ width: 100, height: 100, crop: 'limit' }]
  params: {
    folder: "CATEGORY_IMAGES",
  },
});

const uploadCategoryImage = multer({ storage });

module.exports = uploadCategoryImage;
