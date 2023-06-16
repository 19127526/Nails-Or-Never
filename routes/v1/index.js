const express = require('express');
const serviceRoutes = require('./service.route');
const userRoutes = require('./user.route');
const router = express.Router();
router.use('/services', serviceRoutes);
router.use('/users', userRoutes);
module.exports = router;