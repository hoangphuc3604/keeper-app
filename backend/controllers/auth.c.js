const User = require("../models/user.m");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  me: async (req, res) => {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findOne({ _id: decoded.id });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      console.log("Error:", error.message);
      res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      console.log("Login request:", req.body);
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ message: "Email không tồn tại" });
      }
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        return res.status(400).json({ message: "Mật khẩu không đúng" });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.status(200).json({ message: "Đăng nhập thành công", token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  register: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ message: "Email đã tồn tại" });
      }

      const newUser = new User(req.body);
      newUser.password = await bcrypt.hash(req.body.password, 10);
      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      res.status(201).json({ message: "Đăng ký thành công", token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
