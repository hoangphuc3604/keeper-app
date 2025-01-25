const express = require("express");
const router = express.Router();
const IdeaController = require("../controllers/idea.c");
const ensureAuthenticated = require("../middlewares/auth");

router.get("/", IdeaController.getIdeas);
router.post("/", IdeaController.addIdea);
router.delete("/:id", IdeaController.deleteIdea);

module.exports = router;
