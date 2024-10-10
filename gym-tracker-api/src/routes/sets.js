const express = require("express");
const router = express.Router();

// model import
const Set = require("../models/setModel");

// sets routes

// get all existing sets
router.get("/", async (req, res) => {
  try {
    const sets = Set.find();
    return res.status(200).json(sets);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
})

// get a existing set by id
router.get("/:id", async (req, res) => {
  try {
    const set = Set.findById(req.params.id);
    if (set == null) {
      return res.status(404).json({ message: 'Cannot find set' });
    }
    return res.status(200).json(set);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
})

// create a new set
router.post("/", async (req, res) => {
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
})

// update a existing set
router.put("/:id", async (req, res) => {
  try {
    const set = Set.findByIdAndUpdate(req.params.id, {
      session: req.body.session,
      numReps: req.body.numReps,
      weight: req.body.weight,
    }, {
      new: true
    });
    if (set == null) {
      return res.status(404).json({ message: 'Cannot find set' });
    }
    return res.status(200).json(set);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
})

// delete a existing set
router.delete("/:id", async (req, res) => {
  try {
    const set = Set.findByIdAndDelete(req.params.id);
    if (set == null) {
      return res.status(404).json({ message: 'Cannot find set' });
    }
    return res.status(200).json(set);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
})

module.exports = router;