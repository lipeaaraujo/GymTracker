const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

// user routes

router.route("/:id/exercises")
  .get(userController.getExercisesByUser);

module.exports = router;
