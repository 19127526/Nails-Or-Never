const multer = require("multer");
const randomstring = require("randomstring");
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'
        || file.mimetype === 'image/jpg'
        || file.mimetype === 'image/gif') {
        const random = randomstring.generate(4);
        file.originalname = Date.now() +  random + file.originalname.substring(file.originalname.lastIndexOf('.'))
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Your file type is not allowed'), false);
    }
};

const upload = multer({fileFilter});

module.exports = upload;