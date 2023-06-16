const services = require('../models/service.model');
exports.getServices = async (req, res) => {
    try {
        const data = await services.getServices();
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.updateServiceById = async (req, res) => {
    try {
        const data = await services.updateServiceById(req.params.id, req.body);
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.getServiceById = async (req, res) => {
    try {
        const data = await services.getServiceById(req.params.id);
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.createService = async (req, res) => {
    try {
        const data = await services.createService(req.body);
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.deleteServiceById = async (req, res) => {
    try {
        const data = await services.deleteServiceById(req.params.id);
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}