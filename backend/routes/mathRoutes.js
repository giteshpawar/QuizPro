const express = require("express");
const auth = require("../middleware/authMiddleware");
const Math = require("../models/Math");

const router = express.Router();


router.get("/", async (req, res) => {
  const questions = await Math.find().sort({
    questionNumber: 1,
  });
  res.json(questions);
});


router.get("/random", async (req, res) => {
  const questions = await Math.aggregate([
    { $sample: { size: 25 } }
  ]);
  res.json(questions);
});

module.exports = router;
