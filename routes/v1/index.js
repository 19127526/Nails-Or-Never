const express = require('express');
const serviceRoutes = require('./service.route');
const userRoutes = require('./user.route');
const imageRoutes = require('./image.route');
const router = express.Router();
router.use('/services', serviceRoutes);
router.use('/users', userRoutes);
router.use('/images',imageRoutes)
module.exports = router;