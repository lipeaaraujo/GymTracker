const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const logoutController = require("../controllers/logoutController");
const refreshTokenController = require("../controllers/refreshTokenController");
const registerController = require("../controllers/registerController");

// user routes

router.route("/register")
  .post(registerController.handleRegister)

router.route("/login")
  .post(authController.handleLogin)

router.route("/refresh")
  .get(refreshTokenController.handleRefreshToken);

router.route("/logout")
  .get(logoutController.handleLogout)

module.exports = router;
