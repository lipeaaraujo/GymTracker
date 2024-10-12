const express = require("express");
const router = express.Router();

// model import
const Session = require("../models/sessionModel");
const Set = require("../models/setModel");

// sessions routes

// get all existing sessions
router.get("/", async (req, res) => {
  try {
    const sessions = await Session.find();
    return res.status(200).json(sessions);    
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
})

// get all the sessions and their sets
router.get("/sets", async (req, res) => {
  try {
    const sessions = await Session.find();
    
    // Promise.all allows all async operations to occur in parallel
    await Promise.all(sessions.map(async (session) => {
      const sets = await Set.find({ session: session._id });
      session.sets = sets;
    }));

    return res.status(200).json(sessions);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
})

// get a existing session by id
router.get("/:id", async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (session == null) {
      return res.status(404).json({ message: 'Cannot find session' })
    }
    return res.status(200).json(session);
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

// get a existing session by id and all it's sets
router.get("/:id/sets", async (req, res) => {
  try {
    const sets = await Set.find({ session: req.params.id });

    const session = await Session.findById(req.params.id);
    if (session == null) {
      return res.status(404).json({ message: 'Cannot find session' });
    }
    
    session.sets = sets;
    return res.status(200).json(session);
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

// create a new session
router.post("/", async (req, res) => {
  const session = new Session({
    exercise: req.body.exercise,
    numSets: req.body.numSets,
    date: req.body.date,
  });

  try {
    await session.save();
    (req.body.sets)?.map(async (set) => {
      set.session = session._id;
      await new Set(set).save();
    });
    return res.status(201).json(session);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
})

// update a existing session
router.put("/:id", async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(req.params.id, {
      exercise: req.body.exercise,
      numSets: req.body.numSets,
      date: req.body.date,
    }, {
      new: true,
    });
    if (session == null) {
      return res.status(404).json({ message: 'Cannot find session' });
    }
    return res.status(200).json(session)
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
})

// delete a existing session and it's related sets
router.delete("/:id", async (req, res) => {
  try {
    const session = await Session.findByIdAndDelete(req.params.id);
    if (session == null) {
      return res.status(404).json({ message: 'Cannot find session' });
    }
    // await Set.deleteMany({ session: session._id });

    return res.status(200).json(session);      
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
})

module.exports = router;