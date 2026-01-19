const MarathiGrammar = require("../models/MarathiGrammar");

exports.getMarathiGrammarQuestions = async (req, res) => {
  try {
    const questions = await MarathiGrammar.find().sort({
      questionNumber: 1,
    });
    res.json(questions);
  } catch (err) {
    res.status(500).json({
      msg: "Failed to fetch Marathi Grammar questions",
    });
  }
};
