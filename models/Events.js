const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({

  // כותרת האירוע
  title: { type: String, required: true, trim: true },

  // תיאור האירוע
  description: { type: String },

  // תאריך האירוע
  date: { type: Date, required: true },

  // שעת תחילת האירוע (פורמט של שעה בלבד, לדוגמה "18:30")
  time: { type: String, required: true },

  // כתובת מלאה של האירוע
  city: { type: String, required: true },             // עיר
  street: { type: String, required: true },           // שם הרחוב
  buildingNumber: { type: String, required: true },   // מספר בית

  // פרטי קשר של יוזם האירוע
  contactEmail: { type: String, required: true },     // כתובת אימייל
  contactPhone: { type: String, required: true },     // מספר טלפון

  // מי שיצר את האירוע - יכול להיות מתנדב או ארגון
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'createdByModel'
  },

  // סוג היוזם - ארגון או מתנדב
  createdByModel: {
    type: String,
    required: true,
    enum: ['Volunteer', 'Organization']
  },

  // רשימת משתתפים באירוע (מזהי מתנדבים)
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Volunteer'
  }],

  // כמות משתתפים באירוע (מתעדכן ידנית ע"י ה-controller)
  participantsCount: {
    type: Number,
    default: 0
  }

}, { timestamps: true }); // מוסיף אוטומטית createdAt ו-updatedAt

module.exports = mongoose.model('Event', eventSchema);