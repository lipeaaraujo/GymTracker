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
  sets: [{ type:mongoose.Schema.Types.ObjectId, ref: "Set" }],
})

module.exports = mongoose.model('Session', SessionSchema);