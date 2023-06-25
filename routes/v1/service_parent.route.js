const express = require('express');
const {isAuth} = require("../../middlewares/auth");
const {getServicesParentWithOutPagination, getServiceByParentName} = require("../../controllers/service_parent.controller");
const {ROLES} = require("../../constants/role");
const router = express.Router();
router.get('/with-out-pagination', isAuth(ROLES), getServicesParentWithOutPagination);
router.get('/detail/:name', isAuth(ROLES), getServiceByParentName)
module.exports = router;




