const express = require('express');
const {getContact, deleteContactById} = require("../../controllers/contact.controller");
const {isAuth} = require("../../middlewares/auth");
const router = express.Router();
router.get('/', isAuth, getContact);
router.delete('/:id', isAuth, deleteContactById);
module.exports = router;
