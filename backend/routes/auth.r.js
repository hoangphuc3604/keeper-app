const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.c");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/me", AuthController.me);
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  const response = req.user;
  if (response) {
    const token = jwt.sign({ id: response._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.redirect(`${process.env.CLIENT_URL}/login?token=${token}`);
  }
  res.redirect(process.env.CLIENT_URL);
});
router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "Đăng xuất thành công" });
});

module.exports = router;
