const contact = require('../models/contact.model');

exports.getContact = async (req, res) => {
  try {
    const {limit, page} = req.query;
    const data = await contact.getContact(limit, page);
    const total = await contact.countContact();
    return res.status(200).json({"status": "success", "services": data, total});
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