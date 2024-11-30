const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/sessionController");

// sessions routes

router.get("/", sessionController.getAllSessions);

router.get("/sets", sessionController.getSessionsAndSets);

router.get("/:id", sessionController.getSessionById);

router.get("/:id/sets", sessionController.getSessionByIdAndSets);

router.post("/", sessionController.handleCreateSession);

router.put("/:id", sessionController.handleUpdateSession);

router.delete("/:id", sessionController.handleDeleteSession);

module.exports = router;
