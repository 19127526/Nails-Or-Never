const gift_card = require('../models/gift_card.model');
const fs = require("fs");
const LIMIT = 5;
const PAGE = 1;

exports.getAllGiftCard = async (req, res) => {
  try {
    const data = await gift_card.getAllGiftCard()
    return res.status(200).json({"status": "success", "giftCard": data});
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}

exports.getGiftCard = async (req, res) => {
  try{
    let {limit, page} = req.query;
    const data = await gift_card.getGiftCard(limit, page);
    const count = await gift_card.countGiftCard();
    return res.status(200).json({
      "status": "success",
      "giftCard": data,
      total: count[0]?.total,
      pages: Math.ceil(count[0]?.total / (limit || LIMIT)),
      limit: limit || LIMIT,
      page: Number(page) || PAGE
    });
  }
  catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}

exports.getDetailGiftCardById = async (req, res) => {
  try {
    const data = await gift_card.getGiftCardById(req.params.id);
    return res.status(200).json({"status": "success", "data": data[0]});
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}

exports.createGiftCard = async (req, res) => {
  const trx = await gift_card.transaction();
  try {
    const body = req.body;
    const giftCardBody = {
      theme: body.theme,
      description: body.description,
    }
    let data = await gift_card.createGiftCard(giftCardBody, trx);
    if (data.length === 0) {
      await trx.rollback();
      return res.status(500).json({"status": "error", "message": "Create gift card fail"});
    }
    data = data[0];
    const file = req.file;
    if (file) {
      const FOLDER = `./public/image/gift-card/${data}`;
      if (!fs.existsSync(FOLDER)) {
        fs.mkdirSync(FOLDER, {recursive: true});
      }
      const fileName = `${FOLDER}/${file.originalname}`;
      fs.writeFileSync(fileName, file.buffer);
      const imageSavedName = `${process.env.HOST}/api/v1/images/gift-card/${data}/${file.originalname}`
      await gift_card.updateGiftCardById(data, {image: imageSavedName}, trx);
    }
    await trx.commit();
    return res.status(200).json({"status": "success", "data": data});
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}

exports.updateGiftCardById = async (req, res) => {
  const trx = await gift_card.transaction();
  try {
    const body = req.body;
    const giftCardBody = {
      id: body.id,
      theme: body.theme,
      description: body.description,
    }
    let imageSavedName = ""
    const file = req.file;
    if (file) {
      const FOLDER = `./public/image/gift-card/${giftCardBody.id}`;
      if (!fs.existsSync(FOLDER)) {
        fs.mkdirSync(FOLDER, {recursive: true});
      }
      else{
        fs.rmSync(FOLDER, { recursive: true, force: true });
        fs.mkdirSync(FOLDER, {recursive: true});
      }
      const fileName = `${FOLDER}/${file.originalname}`;
      fs.writeFileSync(fileName, file.buffer);
      imageSavedName= `${process.env.HOST}/api/v1/images/gift-card/${giftCardBody.id}/${file.originalname}`
    }
    if (imageSavedName) {
      giftCardBody.image = imageSavedName;
    }
    await gift_card.updateGiftCardById(giftCardBody.id, giftCardBody, trx);
    await trx.commit()
    return res.status(200).json({"status": "success"});
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}

exports.deleteGiftCardById = async (req, res) => {
  try {
    const FOLDER = `./public/image/gift-card/${req.params.id}`;
    if (fs.existsSync(FOLDER)) {
      fs.rmSync(FOLDER, { recursive: true, force: true });
      const data = await gift_card.deleteGiftCardById(req.params.id);
      return res.status(200).json({
        "status": "success",
        "message": "Delete Gallery Success"
      });
    }
    else{
      const data = await gift_card.deleteGiftCardById(req.params.id);   return res.status(200).json({
        "status": "success",
        "message": "Folder  not found"
      });
    }
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}



