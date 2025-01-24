const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user.m");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["email", "profile"],
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ googleId: profile.id })
        .then((user) => {
          if (user) {
            return done(null, user);
          } else {
            const newUser = new User({
              googleId: profile.id,
              email: profile.emails[0].value,
            });
            newUser
              .save()
              .then((user) => {
                done(null, user);
              })
              .catch((err) => done(err, null));
          }
        })
        .catch((err) => done(err, null));
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user))
    .catch((err) => done(err, null));
});

module.exports = passport;
