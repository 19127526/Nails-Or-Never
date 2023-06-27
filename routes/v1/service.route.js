const express = require('express');
const {getServices, createService, updateServiceById, getServiceById, deleteServiceById} = require("../../controllers/service.controller");
const {isAuth} = require("../../middlewares/auth");
const router = express.Router();
const multer = require("multer");
const {ROLES, ADMIN} = require("../../constants/role");
const upload = require("../../utils/multer");

router.get('/', isAuth(ROLES), getServices);
router.post('/', isAuth(ADMIN), createService);
router.put('/', isAuth(ADMIN), updateServiceById);
router.get('/:id', isAuth(ADMIN), getServiceById);
router.delete('/:id', isAuth(ADMIN), deleteServiceById);
module.exports = router;