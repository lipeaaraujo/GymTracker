const Encrypt = require("../utils/Encrypt");

// model imports
const User = require("../models/userModel");

const handleRegister = async (req, res) => {
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
      return res.status(409).json({ message: "User already exists" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  try {
    // save the new user.
    await user.save();
    return res.status(201).json(user);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = { handleRegister };
