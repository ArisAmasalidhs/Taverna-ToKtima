const express = require("express");
const {
  addMenuItem,
  addCarouselImage,
  getCarouselImages,
  deleteCarouselImage,
  updateCarouselImage,
  approveReservation,
} = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const multer = require("multer");
const path = require("path");

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

const router = express.Router();

// Menu Management (Admin only)
router.post("/menu", authMiddleware, adminMiddleware, addMenuItem);

// Carousel Management (Admin only)
router.post("/carousel", authMiddleware, adminMiddleware, upload.single("image"), addCarouselImage);
router.get("/carousel", authMiddleware, adminMiddleware, getCarouselImages);
router.delete("/carousel/:id", authMiddleware, adminMiddleware, deleteCarouselImage);
router.put("/carousel/:id", authMiddleware, adminMiddleware, updateCarouselImage);

// Reservation Management (Admin only)
router.put("/reservations/approve", authMiddleware, adminMiddleware, approveReservation);

module.exports = router;
