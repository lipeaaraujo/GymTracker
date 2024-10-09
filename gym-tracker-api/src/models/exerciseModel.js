const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  sessions: [{ type:mongoose.Schema.Types.ObjectId, ref: "Session" }]
})

module.exports = mongoose.model('Exercise', ExerciseSchema);