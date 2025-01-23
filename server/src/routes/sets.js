const express = require("express");
const router = express.Router();
const setController = require("../controllers/setController");

// sets routes

router.route("/")
  .get(setController.getAllSets)
  .post(setController.handleCreateSet)

router.route("/:id")
  .get(setController.getSetById)
  .put(setController.handleUpdateSet)
  .delete(setController.handleDeleteSet)

module.exports = router;
