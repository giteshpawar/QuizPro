const Math = require("../models/Math");
const GeneralKnowledge = require("../models/GeneralKnowledge");
const Intelligence = require("../models/Intelligence");
const MarathiGrammar = require("../models/MarathiGrammar");

exports.getFinalTestQuestions = async (req, res) => {
  try {
    const gk = await GeneralKnowledge.aggregate([
      { $sample: { size: 25 } }
    ]);

    const math = await Math.aggregate([
      { $sample: { size: 25 } }
    ]);

    const intelligence = await Intelligence.aggregate([
      { $sample: { size: 25 } }
    ]);

    const grammar = await MarathiGrammar.aggregate([
      { $sample: { size: 25 } }
    ]);

    const finalQuestions = [
      ...gk,
      ...math,
      ...intelligence,
      ...grammar,
    ];

    res.json(finalQuestions);
  } catch (err) {
    res.status(500).json({
      msg: "Failed to load final exam questions",
    });
  }
};
