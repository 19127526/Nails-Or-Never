const express = require('express');
const {getContact, deleteContactById, createContact} = require("../../controllers/contact.controller");
const {isAuth} = require("../../middlewares/auth");
const {ROLES, ADMIN} = require("../../constants/role");
const router = express.Router();
router.get('/', isAuth(ROLES), getContact);
router.post('/', isAuth(ROLES), createContact)
router.delete('/:id', isAuth(ADMIN), deleteContactById);
module.exports = router;
