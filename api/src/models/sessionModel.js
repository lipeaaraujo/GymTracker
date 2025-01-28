const mongoose = require("mongoose");

// model imports
const Set = require("./setModel");

const SessionSchema = new mongoose.Schema({
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exercise",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  sets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Set" }],
}, {
  methods: {
    async getNumSets() {
      const sets = await Set.find({ session: this._id });
      return sets.length;
    },
    async getBiggestLoad() {
      const maxSet = await Set.find({ session: this._id })
                              .sort({ weight: -1 })
                              .limit(1);
      return maxSet.length ? maxSet[0].weight : 0;
    }
  }
});

// clean up all session sets on delete
SessionSchema.pre('deleteMany', async function(next) {
  const docs = await this.model.find(this.getFilter());
  const sessions = docs.map((item) => item._id);
  await Set.deleteMany({ session: { $in: sessions } });
  next();
});

SessionSchema.pre('findOneAndDelete', async function(next) {
  const sessionId = this._conditions._id
  await Set.deleteMany({ session: sessionId });
  next();
});

module.exports = mongoose.model('Session', SessionSchema);