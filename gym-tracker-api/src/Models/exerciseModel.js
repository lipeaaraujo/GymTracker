const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  sessions: [SessionSchema]
})

module.exports = mongoose.model('Exercise', ExerciseSchema);