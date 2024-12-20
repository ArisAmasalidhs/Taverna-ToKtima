const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For hashing passwords

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Hash the password before saving the user
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Skip if password is not modified
  this.password = await bcrypt.hash(this.password, 10); // Hash the password
  next();
});

// Compare input password with hashed password
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
