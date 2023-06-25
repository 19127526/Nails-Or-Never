const express = require('express');
const {getServices, createService, updateServiceById, getServiceById, deleteServiceById} = require("../../controllers/service.controller");
const {isAuth} = require("../../middlewares/auth");
const router = express.Router();
const multer = require("multer");
const {ROLES, ADMIN} = require("../../constants/role");
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'
        || file.mimetype === 'image/jpg'
        || file.mimetype === 'image/gif') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Your file type is not allowed'), false);
    }
};

const upload = multer({fileFilter});



router.get('/', isAuth(ROLES), getServices);
router.post('/', isAuth(ADMIN), upload.single('file'), createService);
router.put('/:id', isAuth(ADMIN), updateServiceById);
router.get('/:id', isAuth, getServiceById);
router.delete('/:id', isAuth, deleteServiceById);
module.exports = router;