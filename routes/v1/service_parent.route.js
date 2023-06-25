const express = require('express');
const {isAuth} = require("../../middlewares/auth");
const {getServicesParentWithOutPagination, getServiceByParentName, updateServiceParentById, createServiceParent} = require("../../controllers/service_parent.controller");
const {ROLES, ADMIN} = require("../../constants/role");
const upload = require("../../utils/multer");
const router = express.Router();
router.get('/with-out-pagination', isAuth(ROLES), getServicesParentWithOutPagination);
router.get('/detail/:name', isAuth(ROLES), getServiceByParentName)
router.put('/', isAuth(ADMIN), upload.single('file'), updateServiceParentById);
router.post('/', isAuth(ADMIN), upload.single('file'), createServiceParent);
module.exports = router;




