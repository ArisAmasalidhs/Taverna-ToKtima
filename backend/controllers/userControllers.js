const User = require('../models/User');

const updateUser = async (req, res) => {
  const { username, newPassword } = req.body;

  try {
    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (username) user.name = username;
    if (newPassword) user.password = newPassword;

    await user.save();
    res.status(200).json({ name: user.name });
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

module.exports = { updateUser };
