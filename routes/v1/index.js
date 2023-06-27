const express = require('express');
const serviceParentRoutes = require('./service_parent.route');
const serviceRoutes = require('./service.route');
const userRoutes = require('./user.route');
const galleryRoutes = require('./gallery.route');
const galleryParentRoutes = require('./gallery_parent.route');
const contactRoutes = require('./contact.route');
const aboutUsRoutes = require('./about_us.route')
const imageRoutes = require('./image.route');
const employeesRoutes = require("./employee.route");
const giftCardRoutes = require("./gift_card.route")
const router = express.Router();
router.use('/services', serviceRoutes);
router.use('/services-parent', serviceParentRoutes);
router.use('/users', userRoutes);
router.use('/galleries', galleryRoutes);
router.use('/galleries-parent', galleryParentRoutes);
router.use('/contacts', contactRoutes);
router.use('/about-us', aboutUsRoutes);
router.use('/images',imageRoutes)
router.use('/gift-cards', giftCardRoutes)
router.use('/galleries', galleryRoutes);
router.use('/galleries-parent', galleryParentRoutes);
router.use('/employees', employeesRoutes)
module.exports = router;