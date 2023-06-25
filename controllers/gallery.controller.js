const gallery = require('../models/gallery.model');
const gallery_parent = require("../models/gallery_parent.model")
exports.getGallery = async (req, res) => {
  try {
    const {limit, page} = req.query;
    const data = await gallery_parent.getGalleryParent(limit, page);
    for (let i = 0; i < data.length; i++) {
      data[i].service = await gallery.getGalleryByGalleryParentId(data[i].id);
    }
    const total = await gallery_parent.countGalleryParent();
    return res.status(200).json({"status": "success", "services": data, total});
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}

exports.updateGalleryById = async (req, res) => {
  try {
    const data = await gallery.updateGalleryById(req.params.id, req.body);
    return res.status(200).json({"status": "success", "data": data});
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}

exports.getGalleryById = async (req, res) => {
  try {
    const data = await gallery.getGalleryById(req.params.id);
    return res.status(200).json({"status": "success", "data": data});
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}

exports.createGallery = async (req, res) => {
  try {
    const data = await gallery.createGallery(req.body);
    return res.status(200).json({"status": "success", "data": data});
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}

exports.deleteGalleryById = async (req, res) => {
  try {
    const data = await gallery.deleteGalleryById(req.params.id);
    return res.status(200).json({"status": "success", "data": data});
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}