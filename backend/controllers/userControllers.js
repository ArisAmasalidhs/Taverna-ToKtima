const User = require('../models/User');

// Update username and password
const updateUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findById(req.user); // `req.user` is populated by `authMiddleware`

    if (!user) return res.status(404).json({ message: 'User not found' });

    if (username) user.name = username;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();
    res.status(200).json({ name: user.name });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateUser };
