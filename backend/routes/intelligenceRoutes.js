const express = require("express");
const auth = require("../middleware/authMiddleware");
const {
  getIntelligenceQuestions,
} = require("../controllers/intelligenceController");
const Intelligence = require("../models/Intelligence");

const router = express.Router();

router.get("/",  async (req, res) => {
  const questions = await Intelligence.find().sort({
    questionNumber: 1,
  });
  res.json(questions);
});

router.get("/random",async (req, res) => {
  const questions = await Intelligence.aggregate([
    { $sample: { size: 25 } }
  ]);
  res.json(questions);
});

module.exports = router;
