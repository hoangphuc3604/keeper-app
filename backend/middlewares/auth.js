function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: true, message: "Bạn chưa đăng nhập" });
}

module.exports = ensureAuthenticated;
