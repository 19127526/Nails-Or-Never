const services = require('../models/service.model');
const services_parent = require('../models/service_parent.model');
const {parseLimit, parsePage} = require("../utils/mapper");
const fs = require("fs");
const LIMIT = 5;
const PAGE = 1;
exports.getServices = async (req, res) => {
    try {
        let {limit, page} = req.query;
        limit = parseLimit(limit);
        page = parsePage(page);
        const data = await services_parent.getServicesParent(limit, page);
        for (let i = 0; i < data.length; i++) {
            data[i].service = await services.getServiceByServiceParentId(data[i].id);
        }
        const {total} = await services_parent.countServicesParent();
        return res.status(200).json({
            "status": "success",
            "services": data,
            total,
            pages: Math.ceil(total / (limit || LIMIT)),
            limit: limit || LIMIT,
            page: page || PAGE
        });
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
    const trx = await services.transaction();
    try {
        const body = req.body;
        const data = await services.createService(body, trx);
        await trx.commit();
        return res.status(200).json({"status": "success"});
    } catch (e) {
        await trx.rollback();
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.updateServiceById = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        await services.updateServiceById(body.id, body);
        return res.status(200).json({"status": "success"});
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