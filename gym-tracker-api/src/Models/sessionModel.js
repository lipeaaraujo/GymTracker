const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  numSets: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  sets: [SetSchema],
})

module.exports = mongoose.model('Session', SessionSchema);