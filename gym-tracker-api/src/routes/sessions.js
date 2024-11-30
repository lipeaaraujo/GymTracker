const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/sessionController");

// sessions routes

router.route("/")
  .get(sessionController.getAllSessions)
  .post(sessionController.handleCreateSession)

router.route("/:id")
  .get(sessionController.getSessionById)
  .put(sessionController.handleUpdateSession)
  .delete(sessionController.handleDeleteSession)

router.route("/sets")
  .get(sessionController.getSessionsAndSets)

router.route("/:id/sets")
  .get(sessionController.getSessionByIdAndSets)

module.exports = router;
