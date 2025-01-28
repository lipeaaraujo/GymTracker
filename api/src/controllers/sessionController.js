// model import
const Session = require("../models/sessionModel");
const Set = require("../models/setModel");

const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find();
    return res.status(200).json(sessions);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getSessionsAndSets = async (req, res) => {
  try {
    const sessions = await Session.find();

    // Promise.all allows all async operations to occur in parallel
    await Promise.all(
      sessions.map(async (session) => {
        const sets = await Set.find({ session: session._id });
        session.sets = sets;
      })
    );

    return res.status(200).json(sessions);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (session == null) {
      return res.status(404).json({ message: "Cannot find session" });
    }
    const numSets = await session.getNumSets();
    const biggestLoad = await session.getBiggestLoad();

    return res.status(200).json({ ...session.toJSON(), numSets, biggestLoad });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getSessionByIdAndSets = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (session == null) {
      return res.status(404).json({ message: "Cannot find session" });
    }
    const numSets = await session.getNumSets();
    const biggestLoad = await session.getBiggestLoad();

    const sets = await Set.find({ session: req.params.id });
    session.sets = sets;

    return res.status(200).json({ ...session.toJSON(), numSets, biggestLoad });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const handleCreateSession = async (req, res) => {
  const session = new Session({
    exercise: req.body.exercise,
    numSets: req.body.numSets,
    date: req.body.date,
  });

  try {
    await session.save();
    req.body.sets?.map(async (set) => {
      set.session = session._id;
      await new Set(set).save();
    });
    return res.status(201).json(session);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const handleUpdateSession = async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(
      req.params.id,
      {
        exercise: req.body.exercise,
        numSets: req.body.numSets,
        date: req.body.date,
      },
      {
        new: true,
      }
    );
    if (session == null) {
      return res.status(404).json({ message: "Cannot find session" });
    }
    return res.status(200).json(session);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const handleDeleteSession = async (req, res) => {
  try {
    const session = await Session.findByIdAndDelete(req.params.id);
    if (session == null) {
      return res.status(404).json({ message: "Cannot find session" });
    }
    // await Set.deleteMany({ session: session._id });

    return res.status(200).json(session);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllSessions,
  getSessionById,
  getSessionByIdAndSets,
  getSessionsAndSets,
  handleCreateSession,
  handleDeleteSession,
  handleUpdateSession,
};
