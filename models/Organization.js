const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const organizationSchema = new mongoose.Schema({
  organizationName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // לא חובה בשלב הזה אם לא בטופס
  address: {
    street_Name: { type: String },
    street_Num: { type: String },
    appartment_Num: { type: String },
    appartment_Floor: { type: String },
    city: { type: String }
  },
  about: { type: String },
  profileImage: { type: String }, // זה השם שהקונטרולר משתמש בו
  role: { type: String, default: 'organization' }
}, { timestamps: true });


module.exports = mongoose.model('Organization', organizationSchema);
