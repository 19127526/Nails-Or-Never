const employees = require('../models/employees.model');

exports.getEmployees = async (req, res) => {
  try {
    const {limit, page} = req.query;
    const data = await employees.getEmployees(limit, page);
    const total = await employees.countEmployees();
    return res.status(200).json({"status": "success", "employees": data, total});
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}

exports.updateEmployeesById = async (req, res) => {
  try {
    const data = await employees.updateEmployeesById(req.params.id, req.body);
    return res.status(200).json({"status": "success", "data": data});
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
  try {
    const data = await employees.createEmployees(req.body);
    return res.status(200).json({"status": "success", "data": data});
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}

exports.deleteEmployeesById = async (req, res) => {
  try {
    const data = await employees.deleteEmployeesById(req.params.id);
    return res.status(200).json({"status": "success", "data": data});
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}