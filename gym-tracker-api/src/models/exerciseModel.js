const mongoose = require("mongoose");

// model imports
const Session = require("./sessionModel");

const ExerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  sessions: [{ type:mongoose.Schema.Types.ObjectId, ref: "Session" }]
});

// clean up all exercise sessions on delete
ExerciseSchema.pre('findOneAndDelete', async function(next) {
  const exerciseId = this._conditions._id
  await Session.deleteMany({ exercise: exerciseId });
  next();
});

module.exports = mongoose.model('Exercise', ExerciseSchema);