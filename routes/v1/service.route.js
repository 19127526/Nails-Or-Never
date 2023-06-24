const express = require('express');
const {getServices, createService, updateServiceById, getServiceById, deleteServiceById} = require("../../controllers/service.controller");
const {isAuth} = require("../../middlewares/auth");
const router = express.Router();
const multer = require("multer");
const {ROLES, ADMIN} = require("../../constants/role");

const upload = multer();

router.get('/', isAuth(ROLES), getServices);
router.post('/', isAuth(ADMIN), upload.single('file'), createService);
router.put('/:id', isAuth, updateServiceById);
router.get('/:id', isAuth, getServiceById);
router.delete('/:id', isAuth, deleteServiceById);
module.exports = router;
