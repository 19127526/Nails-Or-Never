const express = require('express');
const {getAboutUs, updateAboutUsById} = require("../../controllers/about_us.controller");
const {isAuth} = require("../../middlewares/auth");
const router = express.Router();
router.get('/', isAuth, getAboutUs);
router.put('/:id', isAuth, updateAboutUsById);
module.exports = router;
