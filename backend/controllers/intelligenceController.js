const Intelligence = require("../models/Intelligence");

exports.getIntelligenceQuestions = async (req, res) => {
  try {
    const questions = await Intelligence.find().sort({
      questionNumber: 1,
    });
    res.json(questions);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Failed to fetch Intelligence questions" });
  }
};
