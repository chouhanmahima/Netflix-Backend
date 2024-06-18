const express = require("express");
const { Register } = require("../controllers/userController");

const router = express.Router();

// Register
router.post("/register", Register);

module.exports = router;