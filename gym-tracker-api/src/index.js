const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser")
const verifyAuth = require("./middlewares/verifyAuth");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middlewares/credentials");

// starting app and port
const app = express();
const port = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// router imports
const userRoutes = require("./routes/users");
const exerciseRoutes = require("./routes/exercises");
const sessionRoutes = require("./routes/sessions");
const setRoutes = require("./routes/sets");

app.use("/", userRoutes);
app.use("/exercise", verifyAuth, exerciseRoutes);
app.use("/session", verifyAuth, sessionRoutes);
app.use("/set", verifyAuth, setRoutes);

app.listen(port, async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to database");
  } catch (err) {
    console.log(err);
  }
  console.log(`Running on port ${port}`);
})