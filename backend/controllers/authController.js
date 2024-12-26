const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found!' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials!' });

    const token = generateToken(user);
    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password ,role} = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists!' });

    const newUser = new User({ name, email, password,role });
    await newUser.save();

    const token = generateToken(newUser);
    res.status(201).json({ token, user: { id: newUser._id, name: newUser.name, email: newUser.email,role:newUser.role } });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Get User Details
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password'); // Exclude password
    if (!user) return res.status(404).json({ message: 'User not found!' });

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user details:', error.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

module.exports = { loginUser, registerUser, getUser };
