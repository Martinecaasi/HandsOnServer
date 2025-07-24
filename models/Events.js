const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String },
  date: { type: Date, required: true },
  location: { type: String },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'createdByModel'
  },
  createdByModel: {
    type: String,
    required: true,
    enum: ['Volunteer', 'Organization']
  },

  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Volunteer'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
