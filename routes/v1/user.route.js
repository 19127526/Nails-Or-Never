const express = require('express');
const router = express.Router();
const {userSignIn, createUser, signOut, createAdmin, forgotPassword} = require("../../controllers/user.controller");
const {isAuth} = require("../../middlewares/auth");
router.post('/login', userSignIn);
router.post('/logout', isAuth, signOut);
router.post('/register', createUser)
router.post('/register-admin', createAdmin)
router.post('/forgot-password', forgotPassword)
module.exports = router;