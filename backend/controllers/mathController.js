const Math = require("../models/Math");

exports.getMathQuestions = async (req, res) => {
  try {
    const questions = await Math.find().sort({
      questionNumber: 1,
    });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch Math questions" });
  }
};
