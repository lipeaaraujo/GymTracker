const mongoose = require("mongoose");

const SetSchema = new mongoose.Schema({
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session",
    required: true,
  },
  numReps: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('Set', SetSchema);