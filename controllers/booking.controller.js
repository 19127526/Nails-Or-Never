const booking = require("../models/booking.model");
const employee = require("../models/employees.model");
const dayoff = require("../models/dayoff.model");
const services = require("../models/service.model");
const emailjs = require('@emailjs/nodejs');
const {parseDate, sumTime, parseLimit, parsePage} = require("../utils/mapper");
const randomstring = require("randomstring");
const path = require("path");
exports.checkBeforeCreateBooking = async (req, res, next) => {
    try {
        const bookingReq = {
            employees_id: req.body.employees_id,
            booking_date: parseDate(req.body.booking_date),
            booking_time: req.body.booking_time,
            services: req.body.services
        }
        let finishedTime = 0
        for (let i = 0; i < bookingReq.services.length; i++) {
            const service = await services.getServiceById(bookingReq.services[i]);
            if (service.length <= 0) {
                throw new Error("Service not found");
            } else {
                finishedTime += service[0].time;
            }
        }
        finishedTime = sumTime(bookingReq.booking_time, finishedTime);
        const check = await booking.getBookingFreeTimeByEmployeeId(bookingReq.employees_id, bookingReq.booking_time, finishedTime, bookingReq.booking_date);
        if (check.length > 0) {
            return res.status(400).json({message: "Time is not available"});
        }
        next();
    } catch (e) {
        res.status(400).json({message: e.message});
    }
}

exports.createBooking = async (req, res) => {
    const trx = await booking.transaction();
    try {
        const bookingReq = {
            full_name: req.body.full_name,
            cellphone_number: req.body.cellphone_number,
            email: req.body.email,
            appointment_note: req.body.appointment_note,
            employees_id: req.body.employees_id,
            booking_date: parseDate(req.body.booking_date),
            booking_time: req.body.booking_time,
        }
        let id = await booking.createBooking(bookingReq, trx);
        id = id[0];
        const listService = req.body.services;
        for (let i = 0; i < listService.length; i++) {
            await booking.insertBookingService({
                service_id: listService[i],
                booking_id: id
            }, trx);
        }

        let listServices = []
        let finishedTime = 0
        for (let i = 0; i < listService.length; i++) {
            const service = await services.getServiceById(listService[i]);
            if (service.length <= 0) {
                throw new Error("Service not found");
            } else {
                listServices.push(service[0].name);
                finishedTime += service[0].time;
            }
        }

        finishedTime = sumTime(bookingReq.booking_time, finishedTime);
        await booking.updateBooking({finished_time: finishedTime}, {id: id}, trx);
        let employeeRequired = await employee.getEmployeesById(bookingReq.employees_id);
        let servicesBody = listServices.join(", ");
        let body = `Your service booking has been successfully placed on ${bookingReq.booking_date}
         at ${bookingReq.booking_time}. Customers will be served by our staff is ${employeeRequired.full_name}-${employeeRequired.id}.
         Services include ${servicesBody} .We are going to confirm in the shortest time. Our store is pleased to close to you. Thank you for our purchase. 💖💖💖`;
        const templateCustomer = {
            full_name: bookingReq.full_name,
            to_email: bookingReq.email,
            title: "Your booking is confirmed",
            body: body,
        }

        //mail for customer
        emailjs.send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_1_ID, templateCustomer, {
            publicKey: process.env.EMAILJS_PUBLIC_KEY,
            privateKey: process.env.EMAILJS_PRIVATE_KEY,
        }).then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function (error) {
            console.log('FAILED...', error);
        });

        body = `You have a new booking on ${bookingReq.booking_date} 
        at ${bookingReq.booking_time}. Services include ${servicesBody}. The customer's name is 
        ${bookingReq.full_name}. Customer's email and phone number are ${bookingReq.email} and 
        ${bookingReq.cellphone_number}.  ${bookingReq.appointment_note != undefined && bookingReq.appointment_note != null ?
            `The customer's note is ${bookingReq.appointment_note}` : ``}. 
          Customers will be served by our staff is ${employeeRequired.full_name}-${employeeRequired.id}. 
        Thank you. 💖💖💖`;
        const templateAdmin = {
            full_name: "ADMIN",
            to_email: "nailsorneverllc@gmail.com",
            title: "New booking",
            body: body,
        }
        //mail for admin
        emailjs.send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_1_ID, templateAdmin, {
            publicKey: process.env.EMAILJS_PUBLIC_KEY,
            privateKey: process.env.EMAILJS_PRIVATE_KEY,
        }).then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function (error) {
            console.log('FAILED...', error);
        });

        body = `You have a new booking on ${bookingReq.booking_date} at ${bookingReq.booking_time}. Services include ${servicesBody}. Customers will be served by our staff is ${employeeRequired.full_name}-${employeeRequired.id}. Thank you. 💖💖💖`;
        const templateEmployee = {
            full_name: employeeRequired.full_name,
            to_email: employeeRequired.email,
            title: "New booking",
            body: body,
        }

        //mail for employee
        emailjs.send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_1_ID, templateEmployee, {
            publicKey: process.env.EMAILJS_PUBLIC_KEY,
            privateKey: process.env.EMAILJS_PRIVATE_KEY,
        }).then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function (error) {
            console.log('FAILED...', error);
        });

        await trx.commit();
        return res.status(200).json({"status": "success"});
    } catch (e) {
        await trx.rollback();
        console.log(e);
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.confirmBooking = async (req, res) => {
    const trx = await booking.transaction();
    try {
        const id = req.params.bookingId;
        const reason = req.body.reason;
        if (!id) {
            return res.status(400).json({"status": "error", "message": "booking id is required"});
        }
        await booking.updateBooking({status: 1, reason: reason}, {id: id}, trx);

        //mail for customer
        /*
        emailjs.send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_ID, template, {
            publicKey: process.env.EMAILJS_PUBLIC_KEY,
            privateKey: process.env.EMAILJS_PRIVATE_KEY,
        }).then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            console.log('FAILED...', error);
        });
        */

        //mail for admin
        // emailjs.send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_ID, template, {
        //     publicKey: process.env.EMAILJS_PUBLIC_KEY,
        //     privateKey: process.env.EMAILJS_PRIVATE_KEY,
        // }).then(function(response) {
        //     console.log('SUCCESS!', response.status, response.text);
        // }, function(error) {
        //     console.log('FAILED...', error);
        // });

        await trx.commit();
        return res.status(200).json({"status": "success"});
    } catch (e) {
        await trx.rollback();
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.getBookings = async (req, res) => {
    try {
        let {limit, page} = req.query;
        limit = parseLimit(limit);
        page = parsePage(page);
        const data = await booking.getBookings(limit, page);
        return res.status(200).json({
            "status": "success",
            "booking": data,
        });
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.statistic = async (req, res) => {
    try {
        let {date} = req.query;
        date = new Date(date);
        date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const data = await booking.statistic(date);
        return res.status(200).json({
            "status": "success",
            "booking": data,
        })
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.getBookingById = async (req, res) => {
    try {
        const data = await booking.getBookingById(req.params.id);
        return res.status(200).json({
            "status": "success",
            "booking": data,
        });
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.deleteBooking = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({"status": "error", "message": "booking id is required"});
        }
        await booking.deleteBookingServiceById(id);
        await booking.deleteBooking(id);
        return res.status(200).json({"status": "success"});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.countBooking = async (req, res) => {
    try {
        const data = await booking.countBookings();
        return res.status(200).json({
            "status": "success",
            "count": data.total,
        });
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.getConfirmation = async (req, res) => {
    const trx = await booking.transaction();
    try {
        const checkBookingId = req.params.check;
        const check = await booking.getBookingByBookingId(checkBookingId);
        if (check.length <= 0) {
            return res.status(404).json({"status": "error", "message": "Booking not found"});
        }

        const id = req.params.bookingId;
        if (!id) {
            return res.status(400).json({"status": "error", "message": "booking id is required"});
        }
        const checkBooking = await booking.getBookingById(id);
        if (checkBooking && checkBooking.status === 1) {
            return res.status(400).json({"status": "error", "message": "booking has been confirmed"});
        }
        await booking.updateBooking({status: 1}, {id: id}, trx);
        await trx.commit();
        return res.sendFile(path.join(__dirname, '../public/confirmation.html'));
    } catch (e) {
        await trx.rollback();
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.handleDayOff = async (req, res) => {
    try {
        const date = req.query.date;
        const from = req.query.from;
        const to = req.query.to;
        const body = req.body;
        await dayoff.createDayOff({
            date: date,
            start_time: from,
            end_time: to,
            reason: body.reason,
        })
        const listBooking = body.bookings;
        const trx = await booking.transaction();
        for (let i = 0; i < listBooking.length; i++) {
            await booking.updateBooking({status: 0}, {id: listBooking[i]}, trx);
        }
        await trx.commit();
        return res.status(200).json({
            "status": "success",
        })
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}