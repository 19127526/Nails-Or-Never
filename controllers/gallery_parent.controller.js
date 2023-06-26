const gallery_parent = require('../models/gallery_parent.model');
const services_parent = require("../models/service_parent.model");
const fs = require("fs");
const services = require("../models/service.model");
const gallery = require("../models/gallery.model");
const {parseLimit, parsePage} = require("../utils/mapper");

exports.getGalleryParent = async (req, res) => {
  try {
    const {limit, page, pagination} = req.query;
    if(pagination == true) {
      const data = await gallery_parent.getGalleryParent(limit, page);
      return res.status(200).json({"status": "success", "data": data});
    }
    else {
      const data = await gallery_parent.getAllGalleryParent();
      return res.status(200).json({"status": "success", "data": data});
    }
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}

exports.getListGalleryChildByParentNameOrId = async (req, res) => {
  try {
    let {limit, page, theme, id} = req.query;
    limit = parseLimit(limit);
    page = parsePage(page);
    let detailGalleryParent
    if(theme != undefined && theme != null) {
      detailGalleryParent = await gallery_parent.getGalleryParentByTheme(theme);
    }
    else if(id != undefined && id != null) {
      detailGalleryParent = await gallery_parent.getGalleryParentById(id);
    }
    const data = await gallery.getGalleryPaginationByParentId(limit, page, detailGalleryParent[0]?.id);
    const count = await gallery.countGalleryByParentId(detailGalleryParent[0]?.id)
    return res.status(200).json({
      "status": "success",
      "gallery": data,
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

exports.updateGalleryParentById = async (req, res) => {
  const trx = await services_parent.transaction();
  try {
    const body = req.body;
    const galleryParent = {
      id: body.id,
      theme: body.theme,
      description: body.description,
    }
    let imageSavedName = ""
    const file = req.file;
    if (file) {
      const FOLDER = `./public/image/gallery/${galleryParent.id}/parent`;
      if (!fs.existsSync(FOLDER)) {
        fs.mkdirSync(FOLDER, {recursive: true});
      }
      else{
        fs.rmSync(FOLDER, { recursive: true, force: true });
        fs.mkdirSync(FOLDER, {recursive: true});
      }
      const fileName = `${FOLDER}/${file.originalname}`;
      fs.writeFileSync(fileName, file.buffer);
      imageSavedName= `${process.env.HOST}/api/v1/images/gallery/${galleryParent.id}/parent/${file.originalname}`
    }
    if (imageSavedName) {
      galleryParent.image = imageSavedName;
    }
    await gallery_parent.updateGalleryParentById(galleryParent.id, galleryParent, trx);
    await trx.commit()
    return res.status(200).json({"status": "success"});
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}

exports.getGalleryParentById = async (req, res) => {
  try {
    const data = await gallery_parent.getGalleryParentById(req.params.id);
    return res.status(200).json({"status": "success", "data": data});
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}

exports.createGalleryParent = async (req, res) => {
  const trx = await services_parent.transaction();
  try {
    const body = req.body;
    const galleryParent = {
      theme: body.theme,
      description: body.description,
    }
    let data = await gallery_parent.createGalleryParent(galleryParent, trx);
    if (data.length === 0) {
      await trx.rollback();
      return res.status(500).json({"status": "error", "message": "create service parent fail"});
    }
    data = data[0];
    const file = req.file;
    if (file) {
      const FOLDER = `./public/image/gallery/${data}/parent`;
      if (!fs.existsSync(FOLDER)) {
        fs.mkdirSync(FOLDER, {recursive: true});
      }
      const fileName = `${FOLDER}/${file.originalname}`;
      fs.writeFileSync(fileName, file.buffer);
      const imageSavedName = `${process.env.HOST}/api/v1/images/gallery/${data}/parent/${file.originalname}`
      await gallery_parent.updateGalleryParentById(data, {image: imageSavedName}, trx);
    }
    await trx.commit();
    return res.status(200).json({"status": "success", "data": data});
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}

exports.deleteGalleryParentById = async (req, res) => {
  try {
    const FOLDER = `./public/image/gallery/${req.params.id}/parent`;
    if (fs.existsSync(FOLDER)) {
      fs.rmSync(FOLDER, { recursive: true, force: true });
      const dataSub = await gallery.deleteGalleryByParentId(req.params.id);
      const dataParent = await gallery_parent.deleteGalleryParentById(req.params.id);
      return res.status(200).json({
        "status": "success",
        "message": "Delete Gallery Success"
      });
    }
    else{
      const dataSub = await gallery.deleteGalleryByParentId(req.params.id);
      const dataParent = await gallery_parent.deleteGalleryParentById(req.params.id);
      return res.status(200).json({
        "status": "success",
        "message": "Folder  not found"
      });
    }
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}