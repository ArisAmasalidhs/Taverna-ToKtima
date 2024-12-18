const express = require('express');
const Menu = require('../models/Menu');
const router = express.Router();

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new menu item
router.post('/', async (req, res) => {
  console.log('POST /api/menu hit');
  const menuItem = new Menu(req.body);
  try {
    const savedItem = await menuItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;
