const mongoose = require("mongoose");

// model imports
const Session = require("./sessionModel");

const ExerciseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  sessions: [{ type:mongoose.Schema.Types.ObjectId, ref: "Session" }]
}, {
  toJSON: {
    virtuals: true,
  }
});

// virtual properties
ExerciseSchema.virtual('personalBest').get(async function() {
  const maxSession = await Session.find({ exercise: this._id }).sort({ biggestLoad: -1 }).limit(1);
  if (maxSession.length > 0) {
    return maxSession[0].biggestLoad;
  } else {
    return 0;
  }
});

// clean up all exercise sessions on delete
ExerciseSchema.pre('deleteMany', async function(next) {
  const docs = await this.model.find(this.getFilter());
  const exercises = docs.map((item) => item._id);
  await Session.deleteMany({ exercise: { $in: exercises } });
  next();
});

ExerciseSchema.pre('findOneAndDelete', async function(next) {
  const exerciseId = this._conditions._id
  await Session.deleteMany({ exercise: exerciseId });
  next();
});

module.exports = mongoose.model('Exercise', ExerciseSchema);