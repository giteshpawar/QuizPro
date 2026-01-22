const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false, 
  },

  score: {
    type: Number,
    required: true,
  },

  totalQuestions: {
    type: Number,
    required: true,
  },

  solvedQuestions: {
    type: Number,
    required: true,
  },

  remainingQuestions: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: 7200, 
  },
});

module.exports = mongoose.model("Result", resultSchema);
