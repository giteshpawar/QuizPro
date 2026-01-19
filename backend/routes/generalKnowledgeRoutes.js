const express = require("express");
const auth = require("../middleware/authMiddleware");
const GeneralKnowledge = require("../models/GeneralKnowledge");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const questions = await GeneralKnowledge.find().sort({
    questionNumber: 1,
  });
  res.json(questions);
});

router.get("/random", auth, async (req, res) => {
  const questions = await GeneralKnowledge.aggregate([
    { $sample: { size: 25 } }
  ]);
  res.json(questions);
});

module.exports = router;
