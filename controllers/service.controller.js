const services = require('../models/service.model');
const services_parent = require('../models/service_parent.model');
const {parseLimit, parsePage} = require("../utils/mapper");
const fs = require("fs");
const LIMIT = 5;
const PAGE = 1;
exports.getServices = async (req, res) => {
    try {
        let {limit, page} = req.query;
        limit= parseLimit(limit);
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
    const trx = await services_parent.transaction();
    try {
        const body = req.body;
        const serviceParent = {
            name: body.name,
            description: body.description,
        }
        let data = await services_parent.createServiceParent(serviceParent, trx);
        if (data.length === 0) {
            await trx.rollback();
            return res.status(500).json({"status": "error", "message": "create service parent fail"});
        }
        data = data[0];

        if (body.service){
            const service = JSON.parse(body.service);
            for (let i = 0; i < service.length; i++) {
                service[i].services_parents = data;
                await services.createService(service[i], trx);
            }
        }

        const FOLDER = `./public/image/service/${data}`;
        if (!fs.existsSync(FOLDER)) {
            fs.mkdirSync(FOLDER, {recursive: true});
        }
        const file = req.file;
        if (file) {
            const fileName = `${FOLDER}/${file.originalname}`;
            fs.writeFileSync(fileName, file.buffer);
            const imageSavedName = `${process.env.HOST}/api/v1/images/service/${data}/${file.originalname}`
            await services_parent.updateServiceParentById(data, {image: imageSavedName}, trx);
        }
        await trx.commit();
        return res.status(200).json({"status": "success"});
    } catch (e) {
        await trx.rollback();
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