const express = require('express');
const { getMenuItems, addMenuItem } = require('../controllers/menuController');
const router = express.Router();

// Get all menu items
router.get('/', getMenuItems);

// Add a new menu item
router.post('/', addMenuItem);

module.exports = router;
