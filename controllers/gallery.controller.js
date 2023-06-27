const gallery = require('../models/gallery.model');
const fs = require("fs");
const LIMIT = 5;
const PAGE = 1;
exports.getListGalleryByParentId = async (req, res) => {
  try {
    const {limit, page} = req.query;
    const {id} = req.params
    const data = await gallery.getGalleryByParentId(limit, page, id);
    const count = await gallery.countGalleryByParentId(id);
    return res.status(200).json({
      "status": "success",
      "gallery": data,
      total: count?.total,
      pages: Math.ceil(count?.total / (limit || LIMIT)),
      limit: limit || LIMIT,
      page: Number(page) || PAGE
    });
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}

exports.updateGalleryById = async (req, res) => {
  const trx = await gallery.transaction();
  try {
    const body = req.body;
    const galleryBody = {
      id: body.id,
      gallery_parents: body?.galleryParents
    }
    let imageSavedName = ""
    const file = req.file;
    if (file) {
      const FOLDER = `./public/image/gallery/${galleryBody.gallery_parents}/child/${galleryBody.id}`;
      if (!fs.existsSync(FOLDER)) {
        fs.mkdirSync(FOLDER, {recursive: true});
      }
      else{
        fs.rmSync(FOLDER, { recursive: true, force: true });
        fs.mkdirSync(FOLDER, {recursive: true});
      }
      const fileName = `${FOLDER}/${file.originalname}`;
      fs.writeFileSync(fileName, file.buffer);
      imageSavedName= `${process.env.HOST}/api/v1/images/gallery/${galleryBody.gallery_parents}/child/${galleryBody.id}/${file.originalname}`
    }
    if (imageSavedName) {
      galleryBody.image = imageSavedName;
    }
    await gallery.updateGalleryById(galleryBody.id, galleryBody, trx);
    await trx.commit()
    return res.status(200).json({"status": "success", "data": "Update Gallery Success"});
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}

exports.getDetailGalleryById = async (req, res) => {
  try {
    const data = await gallery.getGalleryById(req.params.id);
    return res.status(200).json({"status": "success", "data": data[0]});
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}

exports.createGallery = async (req, res) => {
  const trx = await gallery.transaction();
  try {
    const body = req.body;
    const galleryBody = {
      gallery_parents: body.galleryParents
    }
    const files = req.files
    if(files) {
      for (const file of files ){
        let data = await gallery.createGallery(galleryBody, trx);
        if (data.length === 0) {
          await trx.rollback();
          return res.status(500).json({"status": "error", "message": "create service parent fail"});
        }
        data = data[0];
        console.log(data)
        if (file) {
          const FOLDER = `./public/image/gallery/${galleryBody?.gallery_parents}/child/${data}`;
          if (!fs.existsSync(FOLDER)) {
            fs.mkdirSync(FOLDER, {recursive: true});
          }
          const fileName = `${FOLDER}/${file.originalname}`;
          fs.writeFileSync(fileName, file.buffer);
          const imageSavedName = `${process.env.HOST}/api/v1/images/gallery/${galleryBody?.gallery_parents}/child/${data}/${file.originalname}`
          await gallery.updateGalleryById(data, {image: imageSavedName}, trx);
        }
      }
    }
    await trx.commit();

    return res.status(200).json({"status": "success", "data": "Create Gallery Success"});
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}

exports.deleteGalleryById = async (req, res) => {
  try {
    const param = req.params;
    const galleryParam = {
      id: param.id,
      gallery_parents: param?.parent_id
    }
    const FOLDER = `./public/image/gallery/${galleryParam?.gallery_parents}/child/${galleryParam?.id}`;
    if (fs.existsSync(FOLDER)) {
      fs.rmSync(FOLDER, { recursive: true, force: true });
      const dataSub = await gallery.deleteGalleryById(galleryParam.id);
      return res.status(200).json({
        "status": "success",
        "message": "Delete Gallery Success"
      });
    }
    else{
      const dataSub = await gallery.deleteGalleryById(galleryParam.id);
      return res.status(200).json({
        "status": "success",
        "message": "Folder  not found"
      });
    }
  } catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}