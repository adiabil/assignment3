// models/sessionModel.js
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  id: { type: Number, uniqe: true },
  crisis: { type: String, required: true },
  clientName: { type: String, required: true },
  counslerName: { type: String, required: true },
  date: { type: Date, required: true },
  sessionStatus: { type: String, required: true },
});

const sessionModel = mongoose.model('counselingSession', sessionSchema);

module.exports = sessionModel;
