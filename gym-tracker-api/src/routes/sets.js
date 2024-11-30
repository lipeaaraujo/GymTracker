const express = require("express");
const router = express.Router();
const setController = require("../controllers/setController");

// sets routes

router.get("/", setController.getAllSets);

router.get("/:id", setController.getSetById);

router.post("/", setController.handleCreateSet);

router.put("/:id", setController.handleUpdateSet);

router.delete("/:id", setController.handleDeleteSet);

module.exports = router;
