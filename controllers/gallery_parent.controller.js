const gallery_parent = require('../models/gallery_parent.model');
exports.getGalleryParent = async (req, res) => {
  try {
    const {limit, page} = req.query;
    const data = await gallery_parent.getGalleryParent(limit, page);
    return res.status(200).json({"status": "success", "data": data});
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}

exports.updateGalleryParentById = async (req, res) => {
  try {
    const data = await gallery_parent.updateGalleryParentById(req.params.id, req.body);
    return res.status(200).json({"status": "success", "data": data});
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
  try {
    const data = await gallery_parent.createGalleryParent(req.body);
    return res.status(200).json({"status": "success", "data": data});
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}

exports.deleteGalleryParentById = async (req, res) => {
  try {
    const data = await gallery_parent.deleteGalleryParentById(req.params.id);
    return res.status(200).json({"status": "success", "data": data});
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}