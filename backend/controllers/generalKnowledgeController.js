const GeneralKnowledge = require("../models/GeneralKnowledge");

exports.getGeneralKnowledgeQuestions = async (req, res) => {
  try {
    const questions = await GeneralKnowledge.find().sort({
      questionNumber: 1,
    });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch GK questions" });
  }
};
