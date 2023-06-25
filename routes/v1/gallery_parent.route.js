const express = require('express');
const {isAuth} = require("../../middlewares/auth");
const {getGalleryParent, updateGalleryParentById, getGalleryParentById, createGalleryParent, deleteGalleryParentById} = require("../../controllers/gallery_parent.controller");
const router = express.Router();
router.get('/', isAuth, getGalleryParent);
router.post('/', isAuth,createGalleryParent)
router.put('/:id', isAuth, updateGalleryParentById)
router.get('/:id', isAuth, getGalleryParentById)
router.delete('/:id', isAuth, deleteGalleryParentById)
module.exports = router;