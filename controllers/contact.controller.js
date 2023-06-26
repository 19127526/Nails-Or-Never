const contact = require('../models/contact.model');

exports.getContact = async (req, res) => {
  try {
    const {limit, page} = req.query;
    const data = await contact.getContact(limit, page);
    const {total} = await contact.countContact();
    return res.status(200).json({"status": "success", "contacts": data, total});
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}

exports.deleteContactById = async (req, res) => {
  try {
    await contact.deleteContactById(req.params.id);
    return res.status(200).json({"status": "success"});
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}