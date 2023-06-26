const express = require('express');
const {isAuth} = require("../../middlewares/auth");
const {getServicesParentWithOutPagination, getServiceByParentName, updateServiceParentById, createServiceParent,
  deleteServiceParentById, getServiceByParentNameOrId, getDetailServiceParentByNameOrId
} = require("../../controllers/service_parent.controller");
const {ROLES, ADMIN} = require("../../constants/role");
const upload = require("../../utils/multer");
const router = express.Router();
router.get('/with-out-pagination', isAuth(ROLES), getServicesParentWithOutPagination);
router.get('/detail', isAuth(ROLES), getDetailServiceParentByNameOrId);
router.get('/list-service', isAuth(ROLES), getServiceByParentNameOrId);
router.put('/', isAuth(ADMIN), upload.single('file'), updateServiceParentById);
router.post('/', isAuth(ADMIN), upload.single('file'), createServiceParent);
router.delete('/:id', isAuth(ADMIN), deleteServiceParentById);
module.exports = router;




