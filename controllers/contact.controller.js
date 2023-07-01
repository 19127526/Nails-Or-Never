const contact = require('../models/contact.model');
const {parseDate} = require("../utils/mapper");
const booking = require("../models/booking.model");
exports.getContact = async (req, res) => {
  try {
    const data = await contact.getAllContact();
    return res.status(200).json({
      "status": "success",
      "contact": data,
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

exports.createContact = async (req, res) => {
  const trx = await contact.transaction();
  try {
    const contactReq = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      message: req.body.message,
    }
    let id = await contact.createContact(contactReq, trx);
    id = id[0];
    await trx.commit();
    return res.status(200).json({"status": "success", "data": id});
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}