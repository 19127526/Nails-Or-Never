const express = require('express');
const {isAuth} = require("../../middlewares/auth");
const {ROLES, ADMIN} = require("../../constants/role");
const upload = require("../../utils/multer");
const {getEmployees, updateEmployees, getEmployeesById, createEmployees, deleteEmployeesById, getEmployeesFreeTimeById,
    getEmployeesFreeTime, getEmployeesFreeTimeWithBooking
} = require("../../controllers/employees.controller");
const router = express.Router();
router.get('/', isAuth(ROLES), getEmployees);
router.put('/', isAuth(ADMIN),upload.single('file'), updateEmployees);
router.get('/:id', isAuth(ROLES), getEmployeesById);
router.post('/', isAuth(ADMIN), upload.single('file'), createEmployees);
router.delete('/:id', isAuth(ADMIN), deleteEmployeesById);
router.get('/list/booking/:time', isAuth(ADMIN), getEmployeesFreeTimeWithBooking);
router.get('/list/:time', isAuth(ROLES), getEmployeesFreeTime);
router.get('/:id/:time', isAuth(ROLES), getEmployeesFreeTimeById);

module.exports = router;


