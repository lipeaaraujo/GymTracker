const jwt = require('jsonwebtoken');
require("dotenv").config()

const verifyAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: "Couldn't get auth header" });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: err.message });
      }
      req.user = decoded.name;
      next();
    }
  );
}

module.exports = verifyAuth;