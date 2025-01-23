const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.c");
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
  res.json({ message: "Đăng nhập thành công", token });
});

module.exports = router;
