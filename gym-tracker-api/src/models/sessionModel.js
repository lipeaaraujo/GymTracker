const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exercise",
    required: true,
  },
  numSets: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  sets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Set" }],
})

module.exports = mongoose.model('Session', SessionSchema);