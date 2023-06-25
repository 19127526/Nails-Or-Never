const express = require('express');
const {getGallery, updateGalleryById, getGalleryById, createGallery, deleteGalleryById} = require("../../controllers/gallery.controller");
const {isAuth} = require("../../middlewares/auth");
const router = express.Router();
router.get('/', isAuth, getGallery);
router.put('/', isAuth, updateGalleryById);
router.get('/:id', isAuth, getGalleryById);
router.post('/', isAuth, createGallery);
router.delete('/:id', isAuth, deleteGalleryById);

module.exports = router;


