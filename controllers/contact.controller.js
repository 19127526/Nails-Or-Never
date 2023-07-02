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


    let bodyMail = `Thank you very much for your attention to this matter. I look forward to hearing from you soon:
        Full Name: ${body.name}
        Email: ${body.email}
        Phone: ${body.phone}
        Message: ${body.message}`

    const templateCustomer = {
      full_name: body.name,
      to_email: body.email,
      title: "Contacting Web Page",
      body: bodyMail,
    }


    emailjs.send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_1_ID, templateCustomer, {
      publicKey: process.env.EMAILJS_PUBLIC_KEY,
      privateKey: process.env.EMAILJS_PRIVATE_KEY,
    }).then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
      console.log('FAILED...', error);
    });

    bodyMail = `Someone send you a contact: 
        Full Name: ${body.name}
        Email: ${body.email}
        Phone: ${body.phone}
        Message: ${body.message}
`
    const templateAdmin = {
      full_name: body.name,
      to_email: body.email,
      title: "Contacting Web Page",
      body: bodyMail,
    }


    emailjs.send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_1_ID, templateAdmin, {
      publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY,
    }).then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
      console.log('FAILED...', error);
    });
    return res.status(200).json({"status": "success", "data": id});
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}