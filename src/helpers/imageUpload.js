const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}_${file.originalname.replace(/\s+/g, '_')}`;
        cb(null, uniqueSuffix);
    }
});

const upload = multer({ storage });

module.exports = { upload };