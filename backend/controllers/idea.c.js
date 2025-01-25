const Idea = require("../models/idea.m");
const jwt = require("jsonwebtoken");

module.exports = {
  getIdeas: async (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded) {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        if (!decoded.id) {
          return res.status(401).json({ message: "Unauthorized" });
        } else {
          var ideas = await Idea.find({ author: decoded.id });
        }
      }

      res.json(ideas);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Error in getting ideas");
    }
  },
  addIdea: async (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded) {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        if (!decoded.id) {
          return res.status(401).json({ message: "Unauthorized" });
        } else {
          const { title, content } = req.body;
          const newIdea = new Idea({
            title,
            content,
            author: decoded.id,
          });
          await newIdea.save();

          res.json({ message: "Idea Added Successfully" });
        }
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Error in Saving" });
    }
  },
  deleteIdea: async (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded) {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        if (!decoded.id) {
          return res.status(401).json({ message: "Unauthorized" });
        } else {
          await Idea.findByIdAndDelete(req.params.id);
          res.json({ message: "Idea Deleted Successfully" });
        }
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Error in Deleting" });
    }
  },
};
