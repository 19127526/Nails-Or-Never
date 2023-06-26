const express = require('express');
const {isAuth} = require("../../middlewares/auth");
const {getGalleryParent, updateGalleryParentById, getGalleryParentById, createGalleryParent, deleteGalleryParentById, getListGalleryChildByParentNameOrId} = require("../../controllers/gallery_parent.controller");
const {ROLES, ADMIN} = require("../../constants/role");
const upload = require("../../utils/multer");
const router = express.Router();
router.get('/', isAuth(ROLES), getGalleryParent);
router.get('/list-gallery', isAuth(ROLES), getListGalleryChildByParentNameOrId);
router.post('/', isAuth(ADMIN), upload.single('file'), createGalleryParent)
router.put('/', isAuth(ADMIN), upload.single('file'), updateGalleryParentById)
router.get('/:id', isAuth(ROLES), getGalleryParentById)
router.delete('/:id', isAuth(ADMIN), deleteGalleryParentById)
module.exports = router;