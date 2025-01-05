const express = require('express');
const { getMenuItems, addMenuItem, deleteMenuItem } = require('../controllers/menuController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

// Get all menu items (Public)
router.get('/', getMenuItems);

// Add a new menu item (Admin Only)
router.post('/', authMiddleware, adminMiddleware, addMenuItem);

// Delete a menu item (Admin Only)
router.delete('/:id', authMiddleware, adminMiddleware, deleteMenuItem);

module.exports = router;
