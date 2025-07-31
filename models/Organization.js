const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const organizationSchema = new mongoose.Schema({
  organizationName: { type: String, required: true },
  speciality: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  description: { type: String },
  profileImage: { type: String },
  isPrivate: { type: Boolean, default: false },
  about: { type: String },
  handsNeeded: { type: Number },
  role:{type:String,default:'organization'}

}, { timestamps: true });

// הצפנת סיסמה לפני שמירה
organizationSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Organization', organizationSchema);
