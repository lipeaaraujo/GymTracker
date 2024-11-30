const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const logoutController = require("../controllers/logoutController");
const refreshTokenController = require("../controllers/refreshTokenController");
const registerController = require("../controllers/registerController");

// user routes

router.post("/register", registerController.handleRegister);

router.post("/login", authController.handleLogin);

router.get("/refresh", refreshTokenController.handleRefreshToken);

router.get("/logout", logoutController.handleLogout);

module.exports = router;
