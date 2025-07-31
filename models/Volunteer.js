const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const volunteerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  birthdate: { type: Date, required: true },
  aboutMe: { type: String },
  profileImage: { type: String },
  userPrivate: { type: Boolean, default: false },
  role:{type:String, default:'volunteer'}
}, { timestamps: true });

volunteerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Volunteer', volunteerSchema);
