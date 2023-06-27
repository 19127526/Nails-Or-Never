const services_parent = require('../models/service_parent.model');
const {parseLimit, parsePage} = require("../utils/mapper");
const services = require("../models/service.model");
const fs = require("fs");
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

exports.getAll = async (req, res) => {
    try {
        const data = await services_parent.getAll();
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.updateServiceParentById = async (req, res) => {
    const trx = await services_parent.transaction();
    try {
        const id = req.params.id;
        const body = req.body;
        const serviceParent = {
            id,
            name: body.name,
            description: body.description,
        }
        let imageSavedName = ""
        const file = req.file;
        if (file) {
            const FOLDER = `./public/image/service/${serviceParent.id}`;
            if (!fs.existsSync(FOLDER)) {
                fs.mkdirSync(FOLDER, {recursive: true});
            }
            const fileName = `${FOLDER}/${file.originalname}`;
            fs.writeFileSync(fileName, file.buffer);
             imageSavedName= `${process.env.HOST}/api/v1/images/service/${serviceParent.id}/${file.originalname}`
        }
        if (imageSavedName) {
            serviceParent.image = imageSavedName;
        }
        await services_parent.updateServiceParentById(serviceParent.id, serviceParent, trx);
        await trx.commit();
        return res.status(200).json({"status": "success"});
    } catch (e) {
        await trx.rollback();
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.getServiceParentById = async (req, res) => {
    try {
        const data = await services_parent.getServiceParentById(req.params.id);
        if (data.length === 0) {
            return res.status(404).json({"status": "error", "message": "NOT FOUND"});
        }
        return res.status(200).json({"status": "success", "data": data[0]});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.getServiceByParentName = async (req, res) => {
    try{
        const data = await services_parent.getServiceParentByName(req.params.name);
        if (data.length === 0) {
            return res.status(404).json({"status": "error", "message": "NOT FOUND"});
        }
        return res.status(200).json({"status": "success", "data": data[0]});
    }catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.createServiceParent = async (req, res) => {
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
        if (body.service) {
            const service = JSON.parse(body.service);
            for (let i = 0; i < service.length; i++) {
                service[i].services_parents = data;
                await services.createService(service[i], trx);
            }
        }

        const file = req.file;
        if (file) {
            const FOLDER = `./public/image/service/${data}`;
            if (!fs.existsSync(FOLDER)) {
                fs.mkdirSync(FOLDER, {recursive: true});
            }
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

exports.deleteServiceParentById = async (req, res) => {
    const trx = await services_parent.transaction();
    try {
        const FOLDER = `./public/image/service/${req.params.id}`;
        if (fs.existsSync(FOLDER)) {
            fs.rmdirSync(FOLDER, {recursive: true});
        }
        await services.deleteServicesByParentId(req.params.id,trx);
        await services_parent.deleteServiceParentById(req.params.id,trx);
        await trx.commit();
        return res.status(200).json({"status": "success"});
    } catch (e) {
        await trx.rollback();
        return res.status(500).json({"status": "error", "message": e.message});
    }
}