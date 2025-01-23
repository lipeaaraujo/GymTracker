// model imports
const User = require("../models/userModel");
const Exercise = require("../models/exerciseModel");

const getExercisesByUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const exercises = await Exercise.find({ user: userId });
    return res.status(200).json(exercises);      
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getExercisesByUser,
}