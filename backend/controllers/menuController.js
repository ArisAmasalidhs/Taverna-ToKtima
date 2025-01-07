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
    const { name, description, price, category, imageUrl } = req.body;

    // Validate category
    if (!["Salads", "Main Course", "Desserts", "Appetizers", "Dips", "Soups"].includes(category)) {
      return res.status(400).json({ message: 'Invalid category.' });
    }

    const menuItem = new Menu({ name, description, price, category, imageUrl });
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

// Edit a Menu Item (Admin Only)
const editMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, imageUrl } = req.body;

    // Validate category
    if (category && !["Salads", "Main Course", "Desserts", "Appetizers", "Dips", "Soups"].includes(category)) {
      return res.status(400).json({ message: 'Invalid category.' });
    }

    const updatedItem = await Menu.findByIdAndUpdate(
      id,
      { name, description, price, category, imageUrl },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Menu item not found.' });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update menu item.' });
  }
};

module.exports = {
  getMenuItems,
  addMenuItem,
  deleteMenuItem,
  editMenuItem,
};
