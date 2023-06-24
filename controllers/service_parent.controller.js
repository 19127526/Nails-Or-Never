const services = require('../models/service_parent.model');
exports.getServicesParent = async (req, res) => {
    try {
        const {limit, page} = req.query;
        const data = await services.getServicesParent(limit, page);
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.updateServiceParentById = async (req, res) => {
    try {
        const data = await services.updateServiceParentById(req.params.id, req.body);
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.getServiceParentById = async (req, res) => {
    try {
        const data = await services.getServiceParentById(req.params.id);
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.createServiceParent = async (req, res) => {
    try {
        const data = await services.createServiceParent(req.body);
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.deleteServiceParentById = async (req, res) => {
    try {
        const data = await services.deleteServiceParentById(req.params.id);
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}