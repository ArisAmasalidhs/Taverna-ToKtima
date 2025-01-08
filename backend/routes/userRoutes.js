const express = require("express");
const { updateUser } = require("../controllers/userControllers"); // Correct path to userController
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multerConfig"); // Correct path to multerConfig

const router = express.Router();

// Update user profile with file upload
router.put("/update", authMiddleware, upload.single("profilePicture"), updateUser);

module.exports = router;
