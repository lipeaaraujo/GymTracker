const mongoose = require("mongoose");

// model imports
const Session = require("./sessionModel");
const Set = require("./setModel");

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
  methods: {
    async getPersonalBest() {
      const personalBestSet = await Set.aggregate([
        { $lookup: { from: 'sessions', localField: 'session', foreignField: '_id', as: 'sessionDetails' } },
        { $match: { 'sessionDetails.exercise': this._id } },
        { $sort: { weight: -1 } },
        { $limit: 1 }
      ])
      return personalBestSet.length ? personalBestSet[0].weight : 0;
    }
  },
  toJSON: {
    virtuals: true,
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