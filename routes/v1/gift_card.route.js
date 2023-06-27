const express = require('express');
const {isAuth} = require("../../middlewares/auth");
const {ROLES, ADMIN} = require("../../constants/role");
const upload = require("../../utils/multer");
const {getAllGiftCard, getGiftCard, getDetailGiftCardById, deleteGiftCardById, updateGiftCardById, createGiftCard} = require("../../controllers/gift_card.controller");
const router = express.Router();
router.get('/', isAuth(ROLES), getAllGiftCard);
router.get('/list-gift-card', isAuth(ROLES), getGiftCard);
router.put('/', isAuth(ADMIN),upload.single('file'), updateGiftCardById);
router.get('/:id', isAuth(ROLES), getDetailGiftCardById);
router.post('/', isAuth(ADMIN), upload.single('file'), createGiftCard);
router.delete('/:id', isAuth(ADMIN), deleteGiftCardById);

module.exports = router;