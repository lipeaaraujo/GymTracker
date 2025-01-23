// model import
const Set = require("../models/setModel");

const getAllSets = async (req, res) => {
  try {
    const sets = await Set.find();
    return res.status(200).json(sets);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getSetById = async (req, res) => {
  try {
    const set = await Set.findById(req.params.id);
    if (set == null) {
      return res.status(404).json({ message: "Cannot find set" });
    }
    return res.status(200).json(set);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const handleCreateSet = async (req, res) => {
  const set = new Set({
    session: req.body.session,
    numReps: req.body.numReps,
    weight: req.body.weight,
  });
  try {
    await set.save();
    return res.status(201).json(set);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const handleUpdateSet = async (req, res) => {
  try {
    const set = await Set.findByIdAndUpdate(
      req.params.id,
      {
        session: req.body.session,
        numReps: req.body.numReps,
        weight: req.body.weight,
      },
      {
        new: true,
      }
    );
    if (set == null) {
      return res.status(404).json({ message: "Cannot find set" });
    }
    return res.status(200).json(set);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const handleDeleteSet = async (req, res) => {
  try {
    const set = await Set.findByIdAndDelete(req.params.id);
    if (set == null) {
      return res.status(404).json({ message: "Cannot find set" });
    }
    return res.status(200).json(set);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllSets,
  getSetById,
  handleCreateSet,
  handleDeleteSet,
  handleUpdateSet,
};
