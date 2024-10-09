const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config()

// starting app and port
const app = express();
app.use(express.json())
const port = process.env.PORT || 4000;

// router imports
const exerciseRoutes = require("./routes/exercises")

app.use("/exercise", exerciseRoutes);

app.listen(port, async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to database");
  } catch (err) {
    console.log(err);
  }
  console.log(`Running on port ${port}`);
})