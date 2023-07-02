const employees = require('../models/employees.model');
const fs = require("fs");
const gallery = require("../models/gallery.model");
const {parseLimit, parsePage, parseDate} = require("../utils/mapper");
const aboutUs = require("../models/about_us.model");
const booking = require("../models/booking.model");
exports.getEmployees = async (req, res) => {
    try {
        let {limit, page} = req.query;
        limit = parseLimit(limit);
        page = parsePage(page);
        const data = await employees.getEmployees(limit, page);
        return res.status(200).json({"status": "success", "employees": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.updateEmployees = async (req, res) => {
    const trx = await employees.transaction();
    try {
        const body = req.body;
        const employeesBody = {
            id: body.id,
            full_name: body.fullName,
            email: body.email,
            address: body.address,
            phone_number: body.phoneNumber,
            status: body.status
        }
        console.log(employeesBody)
        let imageSavedName = ""
        const file = req.file;
        if (file) {
            const FOLDER = `./public/image/employees/${employeesBody.id}`;
            if (!fs.existsSync(FOLDER)) {
                fs.mkdirSync(FOLDER, {recursive: true, force: true});
            } else {
                fs.rmSync(FOLDER, {recursive: true, force: true});
                fs.mkdirSync(FOLDER, {recursive: true, force: true});
            }
            const fileName = `${FOLDER}/${file.originalname}`;
            fs.writeFileSync(fileName, file.buffer);
            imageSavedName = `${process.env.HOST}/api/v1/images/employees/${employeesBody.id}/${file.originalname}`
        }
        if (imageSavedName) {
            employeesBody.image = imageSavedName;
        }
        await employees.updateEmployeesById(employeesBody.id, employeesBody, trx);
        await trx.commit()
        return res.status(200).json({"status": "success", "data": "Update Employees Success"});
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.getEmployeesById = async (req, res) => {
    try {
        const data = await employees.getEmployeesById(req.params.id);
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.getEmployeesFreeTimeById = async (req, res) => {
    try {
        const id = req.params.id;
        const time = req.params.time;

        const aboutUsData = await aboutUs.getAboutUs();
        if (aboutUsData.length === 0) {
            return res.status(500).json({"status": "error", "message": "get about us fail"});
        }
        const {start_time, end_time} = aboutUsData[0];
        const bookingData = await booking.getBookingByEmployeeIdDateFree(id, parseDate(time));
        let busyTime = bookingData.map((item) => {
            return {
                booking_time: item.booking_time,
                finished_time: item.finished_time
            }
        })

        busyTime.sort((a, b) => {
            const timeA = new Date(`2000-01-01T${a.booking_time}`);
            const timeB = new Date(`2000-01-01T${b.booking_time}`);
            return timeA - timeB;
        })

        const freeTime = [];
        let startTime = start_time;
        let endTime = end_time;
        for (let i = 0; i < busyTime.length; i++) {
            const item = busyTime[i];
            if (startTime < item.booking_time) {
                freeTime.push({
                    from: startTime,
                    to: item.booking_time
                })
            }
            startTime = item.finished_time;
        }

        if (startTime < endTime) {
            freeTime.push({
                from: startTime,
                to: endTime
            })
        }

        const employeeData = await employees.getEmployeesById(id);
        return res.status(200).json({
            "status": "success",
            freeTime, busyTime,"employee": employeeData
        });
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.getEmployeesFreeTimeWithBooking = async (req, res) => {
    try {
        const time = req.params.time;
        const aboutUsData = await aboutUs.getAboutUs();
        if (aboutUsData.length === 0) {
            return res.status(500).json({"status": "error", "message": "get about us fail"});
        }
        const bookingData = await booking.getBookingByDateFree(parseDate(time));
        for (let i = 0; i < bookingData.length; i++) {
            const item = bookingData[i];
            const employeeData = await employees.getEmployeesById(item.employees_id);
            item.employee = employeeData;
        }

        return res.status(200).json({
            "status": "success",
            "data": bookingData
        });
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.getEmployeesFreeTime = async (req, res) => {
    try {
        const time = req.params.time;
        const data = await employees.getAllEmployees();
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            const bookingData = await booking.getBookingByEmployeeIdDateFree(item.id, parseDate(time));
            let busyTime = bookingData.map((item) => {
                return {
                    booking_time: item.booking_time,
                    finished_time: item.finished_time
                }
            })

            busyTime.sort((a, b) => {
                const timeA = new Date(`2000-01-01T${a.booking_time}`);
                const timeB = new Date(`2000-01-01T${b.booking_time}`);
                return timeA - timeB;
            })

            const freeTime = [];
            let startTime = item.start_time;
            let endTime = item.end_time;
            for (let i = 0; i < busyTime.length; i++) {
                const item = busyTime[i];
                if (startTime < item.booking_time) {
                    freeTime.push({
                        from: startTime,
                        to: item.booking_time
                    })
                }
                startTime = item.finished_time;
            }

            if (startTime < endTime) {
                freeTime.push({
                    from: startTime,
                    to: endTime
                })
            }
            item.freeTime = freeTime;
            item.busyTime = busyTime;
        }

        return res.status(200).json({
            "status": "success",
            "data": data
        });
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.createEmployees = async (req, res) => {
    const trx = await gallery.transaction();
    try {
        const body = req.body;
        const employeesBody = {
            full_name: body.fullName,
            email: body.email,
            address: body.address,
            phone_number: body.phoneNumber,
            status: body.status
        }
        let data = await employees.createEmployees(employeesBody, trx);
        if (data.length === 0) {
            await trx.rollback();
            return res.status(500).json({"status": "error", "message": "create service parent fail"});
        }
        data = data[0];
        const file = req.file;
        if (file) {
            const FOLDER = `./public/image/employees/${data}`;
            if (!fs.existsSync(FOLDER)) {
                fs.mkdirSync(FOLDER, {recursive: true, force: true});
            }
            const fileName = `${FOLDER}/${file.originalname}`;
            fs.writeFileSync(fileName, file.buffer);
            const imageSavedName = `${process.env.HOST}/api/v1/images/employees/${data}/${file.originalname}`
            await employees.updateEmployeesById(data, {image: imageSavedName}, trx);
        }
        await trx.commit();
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.deleteEmployeesById = async (req, res) => {
    try {
        const FOLDER = `./public/image/employees/${req.params.id}`;
        if (fs.existsSync(FOLDER)) {
            fs.rmSync(FOLDER, {recursive: true, force: true});
            const data = await employees.deleteEmployeesById(req.params.id);
            return res.status(200).json({
                "status": "success",
                "message": "Delete Gallery Success"
            });
        } else {
            const data = await employees.deleteEmployeesById(req.params.id);
            return res.status(200).json({
                "status": "success",
                "message": "Folder  not found"
            });
        }
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}