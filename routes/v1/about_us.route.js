const express = require('express');
const {getAboutUs, updateAboutUsById} = require("../../controllers/about_us.controller");
const {isAuth} = require("../../middlewares/auth");
const {ROLES, ADMIN} = require("../../constants/role");
const router = express.Router();
router.get('/', isAuth(ROLES), getAboutUs);
router.put('/:id', isAuth(ADMIN), updateAboutUsById);
module.exports = router;
