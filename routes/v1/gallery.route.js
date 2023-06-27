const express = require('express');
const {getListGalleryByParentId, updateGalleryById, getDetailGalleryById, createGallery, deleteGalleryById} = require("../../controllers/gallery.controller");
const {isAuth} = require("../../middlewares/auth");
const {ROLES, ADMIN} = require("../../constants/role");
const upload = require("../../utils/multer");
const router = express.Router();
router.get('/list-gallery/:id', isAuth(ROLES), getListGalleryByParentId);
router.put('/', isAuth(ADMIN),upload.single('file'), updateGalleryById);
router.get('/:id', isAuth(ROLES), getDetailGalleryById);
router.post('/', isAuth(ADMIN), upload.array('files'), createGallery);
router.delete('/:parent_id/:id', isAuth(ADMIN), deleteGalleryById);

module.exports = router;


