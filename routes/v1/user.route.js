const express = require('express');
const router = express.Router();
const {userSignIn, createUser, signOut} = require("../../controllers/user.controller");
router.post('/login', userSignIn);
router.post('/logout', signOut);
router.post('/register', createUser)
module.exports = router;
