const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
} = require("../controllers/authController");

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);

module.exports = router;
