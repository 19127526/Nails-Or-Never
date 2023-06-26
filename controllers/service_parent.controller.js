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

exports.getServicesParentWithOutPagination = async (req, res) => {
    try {
        const data = await services_parent.getServicesParentWithOutPagination();
        return res.status(200).json({"status": "success", "data": data});
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}

exports.getServiceByParentNameOrId = async (req, res) => {
    try {

        let {limit, page, name, id} = req.query;
        limit = parseLimit(limit);
        page = parsePage(page);
        let detailServiceParent
        console.log(id)
        if(name != undefined && name != null) {
            detailServiceParent = await services_parent.getServiceParentByName(name);
        }
        else if(id != undefined && id != null) {
            detailServiceParent = await services_parent.getServiceParentById(id);
        }
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

exports.getServiceByParentName = async (req, res) => {
    try {
        const name = req.params.name;
        let {limit, page} = req.query;
        limit = parseLimit(limit);
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
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}


exports.updateServiceParentById = async (req, res) => {
    const trx = await services_parent.transaction();
    try {
        const body = req.body;
        const serviceParent = {
            id: body.id,
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
            else{
                fs.rmSync(FOLDER, { recursive: true, force: true });
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

exports.getDetailServiceParentByNameOrId = async (req, res) => {
    try {
        let {name, id} = req.query;
        let data
        if(name != undefined && name != null) {
            data = await services_parent.getServiceParentByName(name);
        }
        else if(id != undefined && id != null) {
            data = await services_parent.getServiceParentById(id);
        }
        return res.status(200).json({"status": "success", "data": data[0]});
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
            else {
                fs.rmSync(FOLDER, { recursive: true, force: true });
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
    try {
        const FOLDER = `./public/image/service/${req.params.id}`;
        if (fs.existsSync(FOLDER)) {
            fs.rmSync(FOLDER, { recursive: true, force: true });
            const dataSub = await services.deleteServiceByParentId(req.params.id)
            const dataParent = await services_parent.deleteServiceParentById(req.params.id);
            return res.status(200).json({"status": "success", "data": dataParent});
        }
        else{
            const dataSub = await services.deleteServiceByParentId(req.params.id)
            const dataParent = await services_parent.deleteServiceParentById(req.params.id);
            return res.status(200).json({
                "status": "success",
                "message": "Folder  not found"
            });
        }
    } catch (e) {
        return res.status(500).json({"status": "error", "message": e.message});
    }
}