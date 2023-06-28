const booking = require("../models/booking.model");
const employee = require("../models/employees.model");
const services = require("../models/service.model");
const emailjs = require('@emailjs/nodejs');
const {parseDate, sumTime, parseLimit, parsePage} = require("../utils/mapper");
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
            if (service.length <= 0){
                throw new Error("Service not found");
            }else{
                listServices.push(service[0].name);
                finishedTime += service[0].time;
            }
        }

        finishedTime=sumTime(bookingReq.booking_time,finishedTime);
        await booking.updateBooking({finished_time: finishedTime}, {id: id}, trx);
        let employeeRequired = await employee.getEmployeesById(bookingReq.employees_id);

        const template = {
            ...bookingReq,
            to_email: bookingReq.email,
            services: listServices,
            employee: employeeRequired.full_name,
            finished_time: finishedTime,
        }

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
        return res.status(200).json({"status": "success","data":template});
    } catch (e) {
        await trx.rollback();
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.confirmBooking = async (req, res) => {
    const trx = await booking.transaction();
    try {
        const id = req.params.bookingId;
        const reason = req.body.reason;
        if (!id) {
            throw new Error("Booking id is required");
        }
        await booking.updateBooking({status: 1, reason: reason}, {id: id},trx);

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
            throw new Error("Booking id is required");
        }
        await booking.deleteBooking(id);
        return res.status(200).json({"status": "success"});
    }catch (e) {
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

