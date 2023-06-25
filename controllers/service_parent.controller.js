const services_parent = require('../models/service_parent.model');
const {parseLimit, parsePage} = require("../utils/mapper");
const services = require("../models/service.model");
const LIMIT = 5;
const PAGE = 1;

exports.getServicesParent = async (req, res) => {
    try {
        const {limit, page} = req.query;
        const data = await services_parent.getServicesParent(limit, page);
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.getServicesParentWithOutPagination = async (req, res) => {
    try {
        const data = await services_parent.getServicesParentWithOutPagination();
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.getServiceByParentName = async (req, res) => {
    try {
        const name = req.params.name;
        let {limit, page} = req.query;
        limit= parseLimit(limit);
        page = parsePage(page);
        const detailServiceParent = await services_parent.getServiceParentByName(name)
        const data = await services.getServicesPaginationByParentId(limit, page, detailServiceParent[0]?.id);
        const count = await services.countServicesByParentId(detailServiceParent[0]?.id)
        return res.status(200).json({
            "status": "success",
            "services": data,
            total: count?.total,
            pages: Math.ceil(count?.total / (limit || LIMIT)),
            limit: limit || LIMIT,
            page: page || PAGE
        });
    }
    catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}


exports.updateServiceParentById = async (req, res) => {
    try {
        const data = await services_parent.updateServiceParentById(req.params.id, req.body);
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.getServiceParentById = async (req, res) => {
    try {
        const data = await services_parent.getServiceParentById(req.params.id);
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.createServiceParent = async (req, res) => {
    try {
        const data = await services_parent.createServiceParent(req.body);
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.deleteServiceParentById = async (req, res) => {
    try {
        const data = await services_parent.deleteServiceParentById(req.params.id);
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}