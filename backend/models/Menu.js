const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: {
    type: String,
    required: true,
    enum: ["Salads", "Main Course", "Desserts", "Appetizers", "Dips", "Soups"], // Predefined categories
  },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Menu", MenuSchema);
