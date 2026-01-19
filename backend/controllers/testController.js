const Question = require("../models/Math");
const Result = require("../models/Result");

exports.submitTest = async (req, res) => {
  try {
    const { answers } = req.body;

    const questions = await Question.find();
    const totalQuestions = questions.length;

    let score = 0;
    let solvedQuestions = Object.keys(answers).length;

    questions.forEach((q) => {
      if (answers[q._id] === q.correctAnswer) {
        score++;
      }
    });

    const remainingQuestions =
      totalQuestions - solvedQuestions;

    const result = new Result({
      userId: req.user?.id, 
      score,
      totalQuestions,
      solvedQuestions,
      remainingQuestions,
    });

    await result.save();

    res.json({
      resultId: result._id,
      score,
      totalQuestions,
      solvedQuestions,
      remainingQuestions,
    });
  } catch (err) {
    res.status(500).json({ msg: "Result submission failed" });
  }
};
