const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['teacher', 'student'], required: true },
  organization: String,
  specialty: String,
  experience: String,
  grade: String,
  teacher: String,
  gender: String,
  birthDate: String,

  photo: { type: String },

  // ✅ Email растауға арналған токен және статус
  emailVerificationToken: String,
  emailVerified: { type: Boolean, default: false },

  // 🔐 Құпиясөз қалпына келтіруге арналған өрістер
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

module.exports = mongoose.model('User', userSchema);
