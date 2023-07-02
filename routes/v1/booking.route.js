const express = require('express');
const {ROLES, ADMIN} = require("../../constants/role");
const router = express.Router();
const {isAuth} = require("../../middlewares/auth");
const {
    createBooking, confirmBooking, getBookingById, getBookings, deleteBooking, countBooking, getConfirmation,
    checkBeforeCreateBooking
} = require("../../controllers/booking.controller");
const randomString = require('randomstring');
router.post('/', isAuth(ROLES), checkBeforeCreateBooking, createBooking);
router.post('/confirm/:bookingId', isAuth(ADMIN), confirmBooking);
router.get(`/confirmation/:check/:bookingId`, isAuth(ROLES), getConfirmation);
router.get('/count', isAuth(ROLES), countBooking);
router.get('/:id', isAuth(ADMIN), getBookingById);
router.get('/', isAuth(ADMIN), getBookings);
router.delete('/:id', isAuth(ADMIN), deleteBooking);
module.exports = router;