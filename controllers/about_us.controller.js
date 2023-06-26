const aboutUs = require('../models/about_us.model');
exports.getAboutUs = async (req, res) => {
  try {
    const data = await aboutUs.getAboutUs();
    if (data.length === 0) {
      return res.status(404).json({"status": "error", "message": "About Us not found"});
    }
    return res.status(200).json({"status": "success", "about_us": data[0]});
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}

exports.updateAboutUsById = async (req, res) => {
  try {
    await aboutUs.updateAboutUsById(req.params.id, req.body);
    return res.status(200).json({"status": "success"});
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}