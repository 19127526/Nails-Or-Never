const aboutUs = require('../models/about_us.model');
exports.getAboutUs = async (req, res) => {
  try {
    const data = await aboutUs.getAboutUs();
    return res.status(200).json({"status": "success", "aboutUs": data});
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}

exports.updateAboutUsById = async (req, res) => {
  try {
    const data = await aboutUs.updateAboutUsById(req.params.id, req.body);
    return res.status(200).json({"status": "success", "data": data});
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}