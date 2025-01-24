const Idea = require("../models/idea.m");
const mongoose = require("mongoose");

module.exports = {
  getIdeas: async (req, res) => {
    try {
      const ideas = await Idea.find()
        .sort({ createdAt: -1 })
        .populate("author");
      res.json(ideas);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Lỗi server");
    }
  },
  getByAuthor: async (req, res) => {
    try {
      const { id } = req.params;
      const ideas = await Idea.find({ author: id });
      res.json(ideas);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Lỗi server");
    }
  },
  addIdea: async (req, res) => {
    const { title, description, author } = req.body;
    try {
      const newIdea = new Idea({
        title,
        description,
        author,
      });
      const idea = await newIdea.save();
      res.json(idea);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Lỗi server");
    }
  },
  updateIdea: async (req, res) => {
    const { title, description, author } = req.body;
    const ideaFields = {};
    if (title) ideaFields.title = title;
    if (description) ideaFields.description = description;
    if (author) ideaFields.author = author;
    try {
      let idea = await Idea.findById(req.params.id);
      if (!idea) return res.status(404).json({ msg: "Ý tưởng không tìm thấy" });
      idea = await Idea.findByIdAndUpcreatedAt(
        req.params.id,
        { $set: ideaFields },
        { new: true }
      );
      res.json(idea);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Lỗi server");
    }
  },
  deleteIdea: async (req, res) => {
    try {
      let idea = await Idea.findById(req.params.id);
      if (!idea) return res.status(404).json({ msg: "Ý tưởng không tìm thấy" });
      await Idea.findByIdAndRemove(req.params.id);
      res.json({ msg: "Đã xóa ý tưởng" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Lỗi server");
    }
  },
};
