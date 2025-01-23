// model imports
const User = require("../models/userModel");

const handleLogout = async (req, res) => {
  // get refresh token from cookies
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(204).json({ message: "Cookie not found" });
  }
  const refreshToken = cookies.jwt;

  try {
    // is refresh token in db?
    const foundUser = await User.findOne({ refreshToken: refreshToken });
    if (!foundUser) {
      return res
        .status(403)
        .clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true })
        .json({ message: "User not found" });
    }

    // delete refresh token in db
    await User.findOneAndUpdate(
      { refreshToken: refreshToken },
      { refreshToken: "" }
    );
    return res
      .status(200)
      .clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true })
      .json({ message: "Logout successful" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { handleLogout };
