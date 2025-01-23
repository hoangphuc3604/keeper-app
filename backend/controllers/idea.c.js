const Idea = require("../models/idea.m");

module.exports = {
  // @route   GET api/ideas
  // @desc    Lấy tất cả ý tưởng
  // @access  Public
  getIdeas: async (req, res) => {
    try {
      const ideas = await Idea.find().sort({ date: -1 });
      res.json(ideas);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Lỗi server");
    }
  },
  // @route   POST api/ideas
  // @desc    Thêm ý tưởng
  // @access  Public
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
  // @route   PUT api/ideas/:id
  // @desc    Cập nhật ý tưởng
  // @access  Public
  updateIdea: async (req, res) => {
    const { title, description, author } = req.body;
    const ideaFields = {};
    if (title) ideaFields.title = title;
    if (description) ideaFields.description = description;
    if (author) ideaFields.author = author;
    try {
      let idea = await Idea.findById(req.params.id);
      if (!idea) return res.status(404).json({ msg: "Ý tưởng không tìm thấy" });
      idea = await Idea.findByIdAndUpdate(
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
  // @route   DELETE api/ideas/:id
  // @desc    Xóa ý tưởng
  // @access  Public
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
