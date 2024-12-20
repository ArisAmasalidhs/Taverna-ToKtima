const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);