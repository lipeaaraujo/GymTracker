const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config()

const Set = require("./models/setModel");
const Session = require("./models/sessionModel");
const Exercise = require("./models/exerciseModel");

const app = express();
app.use(express.json())
const port = process.env.PORT || 4000;

// API operations
app.get("/exercise", async (req, res) => {
  const exercises = await Exercise.find();
  return res.send(exercises);
})

app.post("/exercise", async (req, res) => {
  const exercise = new Exercise({
    name: req.body.name,
    description: req.body.description,
  });

  await exercise.save();
  return res.send(exercise);
})

app.put("/exercise/:id", async (req, res) => {
  const exercise = await Exercise.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    description: req.body.description,
  }, {
    new: true,
  });

  return res.send(exercise);
})

app.delete("/exercise/:id", async (req, res) => {
  const exercise = await Exercise.findByIdAndDelete(req.params.id);
  
  return res.send(exercise);
})

app.listen(port, async () => {
  await mongoose.connect(process.env.DATABASE_URL);
  console.log(`application running on port ${port}`);
})