const Menu = require('../models/Menu');

// Get All Menu Items
const getMenuItems = async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a Menu Item
const addMenuItem = async (req, res) => {
  try {
    const menuItem = new Menu(req.body);
    const savedItem = await menuItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getMenuItems,
  addMenuItem,
};
