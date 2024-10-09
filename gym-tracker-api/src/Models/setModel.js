const mongoose = require("mongoose");

const SetSchema = new mongoose.Schema({
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