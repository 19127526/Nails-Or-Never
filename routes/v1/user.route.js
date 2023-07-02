const express = require('express');
const router = express.Router();
const {
    userSignIn,
    createUser,
    signOut,
    createAdmin,
    forgotPassword,
    userSignInCheckOTP
} = require("../../controllers/user.controller");
const {isAuth} = require("../../middlewares/auth");
const {ADMIN} = require("../../constants/role");
router.post('/login', userSignIn);
router.post('/otp', userSignInCheckOTP)
router.post('/logout', isAuth(ADMIN), signOut);
router.post('/register', createUser)
router.post('/register-admin', createAdmin)
router.post('/forgot-password', forgotPassword)
module.exports = router;