const express = require('express');
const {isAuth} = require("../../middlewares/auth");
const {ROLES, ADMIN} = require("../../constants/role");
const upload = require("../../utils/multer");
const {getEmployees, updateEmployees, getEmployeesById, createEmployees, deleteEmployeesById} = require("../../controllers/employees.controller");
const router = express.Router();
router.get('/', isAuth(ROLES), getEmployees);
router.put('/', isAuth(ADMIN),upload.single('file'), updateEmployees);
router.get('/:id', isAuth(ROLES), getEmployeesById);
router.post('/', isAuth(ADMIN), upload.single('file'), createEmployees);
router.delete('/:id', isAuth(ADMIN), deleteEmployeesById);

module.exports = router;


