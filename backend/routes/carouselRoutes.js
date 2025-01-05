const express = require('express');
const { addCarouselImage, getCarouselImages } = require('../controllers/carouselController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

router.post('/', authMiddleware, adminMiddleware, addCarouselImage); // Admin adds image
router.get('/', getCarouselImages); // Anyone fetches images

module.exports = router;
