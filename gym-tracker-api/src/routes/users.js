const express = require("express");
const router = express.Router();
const Encrypt = require("../utils/Encrypt");
const jwt = require("jsonwebtoken");

// model imports
const User = require("../models/userModel");

// user routes

// register a new user
router.post("/register", async (req, res) => {
  const hashPassword = await Encrypt.cryptPassword(req.body.password);
  
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    // verify if user already exists.
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser != null) {
      return res.status(409).json({ message: 'User already exists' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });    
  }

  try {
    // save the new user.
    await user.save()
    return res.status(201).json(user);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// login a existing user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // verify if user exists
    const user = await User.findOne({ email: email });
    if (user == null) {
      return res.status(404).json({ message: 'Incorrect email or password' });
    }

    // validate password
    const matchPassword = Encrypt.comparePassword(password, user.password);
    if (!matchPassword) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    // create access and refresh token
    const accessToken = jwt.sign(
      { name: user.name },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1m' }
    );

    const refreshToken = jwt.sign(
      { name: user.name },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    // save refresh token in the database
    await User.findOneAndUpdate({ email: email }, { refreshToken: refreshToken });

    return res.status(200)
              .cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
              .json(accessToken);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

});

// refresh access token
router.get("/refresh", async (req, res) => {
  // get refresh token from cookie
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(401).json({ message: "Cookie not found" });
  }
  const refreshToken = cookies.jwt;

  try {
    // is the refresh token in the db? 
    const foundUser = await User.findOne({ refreshToken: refreshToken });
    if (!foundUser) return res.status(403).json({ message: "User not found" });

    // generate a new access token
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || foundUser.name !== decoded.name) {
          return res.status(403).json({ message: "Invalid refresh token" });
        }
        const accessToken = jwt.sign(
          { name: decoded.name },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1m" }
        )
        return res.status(200).json({ accessToken });
      }
    )
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
})

// logout
router.get("/logout", async (req, res) => {
  // get refresh token from cookies
  const cookies = req.cookies
  if (!cookies?.jwt) {
    return res.status(204)
              .json({ message: "Cookie not found" });
  }
  const refreshToken = cookies.jwt;

  try {
    // is refresh token in db?
    const foundUser = await User.findOne({ refreshToken: refreshToken });
    if (!foundUser) {
      return res.status(403)
                .clearCookie('jwt', { httpOnly: true })
                .json({ message: "User not found" })
    }

    // delete refresh token in db
    await User.findOneAndUpdate({ refreshToken: refreshToken }, { refreshToken: "" });
    return res.status(200)
              .clearCookie('jwt', { httpOnly: true })
              .json({ message: "Logout successful" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
})


module.exports = router;