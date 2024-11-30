const express = require("express");
const router = express.Router();
const exerciseController = require("../controllers/exerciseController");

// exercises routes

router.route("/")
  .get(exerciseController.getAllExercises)
  .post(exerciseController.handleCreateExercise)

router.route("/:id")
  .get(exerciseController.getExerciseById)
  .put(exerciseController.handleEditExercise)
  .delete(exerciseController.handleDeleteExercise)

router.route("/:id/sessions")
  .get(exerciseController.getExerciseAndSessions)

module.exports = router;
