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


module.exports = mongoose.model('Volunteer', volunteerSchema);
