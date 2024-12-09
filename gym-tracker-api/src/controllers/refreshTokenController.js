const jwt = require("jsonwebtoken");

// model imports
const User = require("../models/userModel");

const handleRefreshToken = async (req, res) => {
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
          { expiresIn: "15m" }
        );
        return res.status(200).json({ 
          accessToken, 
          user: { id: foundUser.id, name: foundUser.name, email: foundUser.email }
        });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { handleRefreshToken };
