const User = require("../models/User");

const updateUser = async (req, res) => {
  try {
    const { username, newPassword } = req.body;

    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (username) user.name = username;
    if (newPassword) user.password = newPassword;
    if (req.file) user.profilePicture = req.file.filename; // Save uploaded file name

    await user.save();

    // Respond with updated user data including profilePicture
    res.status(200).json({
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};


module.exports = { updateUser };
