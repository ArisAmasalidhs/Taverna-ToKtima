const mongoose = require("mongoose");

const CarouselSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  carouselSection: {
    type: String,
    required: true,
    enum: ["top", "about", "bottom"], // Define allowed carousel sections
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Carousel", CarouselSchema);
