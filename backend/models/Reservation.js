const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  numberOfGuests: { type: Number, required: true },
  notes: { type: String },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Rejected'], default: 'Pending' }, // New status field
});

module.exports = mongoose.model('Reservation', ReservationSchema);
