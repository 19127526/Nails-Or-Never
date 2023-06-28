const contact = require('../models/contact.model');
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