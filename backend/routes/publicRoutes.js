// routes/publicRoutes.js
const express = require('express');
const { getCarouselImages } = require('../controllers/adminController');

const router = express.Router();

// Public endpoint to fetch carousel images
router.get('/carousel', getCarouselImages);

module.exports = router;
