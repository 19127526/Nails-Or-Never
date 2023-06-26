const express = require('express');
const {isAuth} = require("../../middlewares/auth");
const {getAll, updateServiceParentById, createServiceParent, getServiceParentById, getServiceByParentName,
    deleteServiceParentById
} = require("../../controllers/service_parent.controller");
const {ROLES, ADMIN} = require("../../constants/role");
const upload = require("../../utils/multer");
const router = express.Router();
router.get('/', isAuth(ROLES), getAll);
router.get('/:id', isAuth(ROLES), getServiceParentById);
router.get('/name/:name', isAuth(ROLES), getServiceByParentName)
router.put('/:id', isAuth(ADMIN), upload.single('file'), updateServiceParentById);
router.post('/', isAuth(ADMIN), upload.single('file'), createServiceParent);
router.delete('/:id', isAuth(ADMIN), deleteServiceParentById);
module.exports = router;




