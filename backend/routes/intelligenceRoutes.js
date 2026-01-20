const express = require("express");
const auth = require("../middleware/authMiddleware");
const {
  getIntelligenceQuestions,
} = require("../controllers/intelligenceController");

const router = express.Router();

router.get("/",getIntelligenceQuestions);

module.exports = router;
