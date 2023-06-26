const express = require('express');
const {getServices, createService, updateServiceById, getServiceById, deleteServiceById, getServiceByName,
    getServicesByServiceParentId
} = require("../../controllers/service.controller");
const {isAuth} = require("../../middlewares/auth");
const router = express.Router();
const multer = require("multer");
const {ROLES, ADMIN} = require("../../constants/role");
const upload = require("../../utils/multer");

router.get('/', isAuth(ROLES), getServices);
router.post('/', isAuth(ADMIN), createService);
router.put('/:id', isAuth(ADMIN), updateServiceById);
router.delete('/:id', isAuth(ADMIN), deleteServiceById);
router.get('/:id', isAuth(ROLES), getServiceById);
router.get('/name/:name', isAuth(ROLES), getServiceByName);
router.get('/service-parent/:id', isAuth(ROLES), getServicesByServiceParentId);
module.exports = router;