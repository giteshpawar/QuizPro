const express = require("express");
const auth = require("../middleware/authMiddleware");
const {
  getFinalTestQuestions,
} = require("../controllers/finalTestController");

const router = express.Router();

router.get("/",  getFinalTestQuestions);

module.exports = router;
