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
    const aboutUsBody = {
      name: req.body?.name,
      description: req.body?.description,
      working_hour: req.body?.working_hour,
      tel: req.body?.tel,
      email: req.body?.email,
      address: req.body?.address,
      footage: req.body?.footage
    }
    const data = await aboutUs.updateAboutUsById(req.body.id, aboutUsBody);
    return res.status(200).json({"status": "success", "data": data});
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}