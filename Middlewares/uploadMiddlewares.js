const multer = require('multer');
const path = require('path');

// הגדרת מיקום ושם הקובץ
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

// סינון סוגי קבצים מותרים
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG and PNG images are allowed'));
  }
};

const upload = require('../Middlewares/uploadMiddlewares');

module.exports = upload;
