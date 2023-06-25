const express = require('express');
const serviceRoutes = require('./service.route');
const userRoutes = require('./user.route');
const galleryRoutes = require('./gallery.route');
const galleryParentRoutes = require('./gallery_parent.route');
const contactRoutes = require('./contact.route');
const aboutUsRoutes = require('./about_us.route')
const router = express.Router();
router.use('/services', serviceRoutes);
router.use('/users', userRoutes);
router.use('/gallery', galleryRoutes);
router.use('/gallery-parent', galleryParentRoutes);
router.use('/contact', contactRoutes);
router.use('/about-us', aboutUsRoutes);
module.exports = router;