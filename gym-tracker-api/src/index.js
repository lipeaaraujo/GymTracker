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
app.use("/login", require("./routes/auth"));
app.use("/register", require("./routes/register"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
app.use("/user", verifyAuth, require("./routes/users"));
app.use("/exercise", verifyAuth, require("./routes/exercises"));
app.use("/session", verifyAuth, require("./routes/sessions"));
app.use("/set", verifyAuth, require("./routes/sets"));

app.listen(port, async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to database");
  } catch (err) {
    console.log("Unable to connect to database");
  }
  console.log(`Running on port ${port}`);
})