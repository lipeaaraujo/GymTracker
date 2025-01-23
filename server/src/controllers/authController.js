const Encrypt = require("../utils/Encrypt");
const jwt = require("jsonwebtoken");

// model imports
const User = require("../models/userModel");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // verify if user exists
    const user = await User.findOne({ email: email });
    if (user == null) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    // validate password
    const matchPassword = await Encrypt.comparePassword(
      password,
      user.password
    );
    if (!matchPassword) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    // create access and refresh token
    const accessToken = jwt.sign(
      { name: user.name },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { name: user.name },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // save refresh token in the database
    await User.findOneAndUpdate(
      { email: email },
      { refreshToken: refreshToken }
    );

    return res
      .status(200)
      .cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        accessToken,
        user: { id: user.id, name: user.name, email: user.email },
      });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { handleLogin };
