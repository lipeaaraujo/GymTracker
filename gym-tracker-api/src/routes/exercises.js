const express = require("express");
const router = express.Router();
const exerciseController = require("../controllers/exerciseController");

// exercises routes

router.get("/", exerciseController.getAllExercises);

router.get("/:id", exerciseController.getExerciseById);

router.get("/:id/sessions", exerciseController.getExerciseAndSessions);

router.post("/", exerciseController.handleCreateExercise);

router.put("/:id", exerciseController.handleEditExercise);

router.delete("/:id", exerciseController.handleDeleteExercise);

module.exports = router;
