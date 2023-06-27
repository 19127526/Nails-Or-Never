const employees = require('../models/employees.model');
const fs = require("fs");
const gallery = require("../models/gallery.model");

exports.getEmployees = async (req, res) => {
  try {
    const data = await employees.getEmployees();
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
    let imageSavedName = ""
    const file = req.file;
    if (file) {
      const FOLDER = `./public/image/employees/${employeesBody.id}`;
      if (!fs.existsSync(FOLDER)) {
        fs.mkdirSync(FOLDER, {recursive: true});
      }
      else{
        fs.rmSync(FOLDER, { recursive: true, force: true });
        fs.mkdirSync(FOLDER, {recursive: true});
      }
      const fileName = `${FOLDER}/${file.originalname}`;
      fs.writeFileSync(fileName, file.buffer);
      imageSavedName= `${process.env.HOST}/api/v1/images/employees/${employeesBody.id}/${file.originalname}`
    }
    if (imageSavedName) {
      employeesBody.image = imageSavedName;
    }
    await employees.updateEmployeesById(employeesBody.id, employeesBody, trx);
    await trx.commit()
    return res.status(200).json({"status": "success", "data": "Update Employees Success"});
  } catch (e) {
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
        fs.mkdirSync(FOLDER, {recursive: true});
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
      fs.rmSync(FOLDER, { recursive: true, force: true });
      const data = await employees.deleteEmployeesById(req.params.id);
      return res.status(200).json({
        "status": "success",
        "message": "Delete Gallery Success"
      });
    }
    else{
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