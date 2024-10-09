const express = require("express");
const router = express.Router();

// model import
const Session = require("../models/sessionModel");

// sessions routes

// get all existing sessions
router.get("/session", async (req, res) => {
  const sessions = Session.find();
  return res.send(sessions);
})