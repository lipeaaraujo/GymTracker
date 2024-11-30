const mongoose = require("mongoose");

const Exercise = require("./exerciseModel"); 

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    default: "",
  },
  exercises: [{ type:mongoose.Schema.Types.ObjectId, ref: "Exercise" }]
});

// clean up all user exercises on delete
UserSchema.pre('findOneAndDelete', async function(next) {
  const userId = this._conditions._id;
  await Exercise.deleteMany({ user: userId });
  next();
});

module.exports = mongoose.model('User', UserSchema);