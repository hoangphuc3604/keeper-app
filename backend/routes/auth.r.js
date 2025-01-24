const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.c");
const passport = require("passport");
require("dotenv").config();

router.get("/me", AuthController.me);
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.redirect(process.env.CLIENT_URL);
});
router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "Đăng xuất thành công" });
});

module.exports = router;
