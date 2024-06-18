const express = require("express");
const { Register, Login } = require("../controllers/userController");

const router = express.Router();

// Register
router.post("/register", Register);

// Login
router.post("/login", Login);

module.exports = router;