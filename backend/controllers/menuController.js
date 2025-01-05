const Menu = require('../models/Menu');

// Get All Menu Items
const getMenuItems = async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch menu items.' });
  }
};

// Add a Menu Item (Admin Only)
const addMenuItem = async (req, res) => {
  try {
    const menuItem = new Menu(req.body);
    const savedItem = await menuItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: 'Failed to add menu item.' });
  }
};

// Delete a Menu Item (Admin Only)
const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Menu.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Menu item not found.' });
    }
    res.status(200).json({ message: 'Menu item deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete menu item.' });
  }
};

module.exports = {
  getMenuItems,
  addMenuItem,
  deleteMenuItem,
};
