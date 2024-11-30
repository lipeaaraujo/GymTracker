// model imports
const Exercise = require("../models/exerciseModel");
const Session = require("../models/sessionModel");

const getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    return res.status(200).json(exercises);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getExerciseById = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (exercise == null) {
      return res.status(404).json({ message: "Cannot find exercise" });
    }
    return res.status(200).json(exercise);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getExerciseAndSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ exercise: req.params.id });

    const exercise = await Exercise.findById(req.params.id);
    if (exercise == null) {
      return res.status(404).json({ message: "Cannot find exercise" });
    }

    exercise.sessions = sessions;
    return res.status(200).json(exercise);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const handleCreateExercise = async (req, res) => {
  const exercise = new Exercise({
    user: req.body.user,
    name: req.body.name,
    description: req.body.description,
  });

  try {
    await exercise.save();
    return res.status(201).json(exercise);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const handleEditExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
      },
      {
        new: true,
      }
    );
    if (exercise == null) {
      return res.status(404).json({ message: "Cannot find exercise" });
    }
    return res.status(200).json(exercise);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const handleDeleteExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id);
    if (exercise == null) {
      return res.status(404).json({ message: "Cannot find exercise" });
    }
    // await Session.deleteMany({ exercise: exercise._id }, );

    return res.status(200).json(exercise);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllExercises,
  getExerciseById,
  getExerciseAndSessions,
  handleCreateExercise,
  handleEditExercise,
  handleDeleteExercise,
};
