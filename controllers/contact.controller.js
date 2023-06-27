const contact = require('../models/contact.model');
const gallery = require("../models/gallery.model");
const LIMIT = 5;
const PAGE = 1;
exports.getContact = async (req, res) => {
  try {
    const {limit, page} = req.query;
    const data = await contact.getContact(limit, page);
    const count = await contact.countContact();
    return res.status(200).json({
      "status": "success",
      "contact": data,
      total: count[0]?.total,
      pages: Math.ceil(count[0]?.total / (limit || LIMIT)),
      limit: limit || LIMIT,
      page: Number(page) || PAGE
    });
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}


exports.deleteContactById = async (req, res) => {
  try {
    const data = await contact.deleteContactById(req.params.id);
    return res.status(200).json({"status": "success", "data": data});
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}