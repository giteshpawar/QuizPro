const express = require("express");
const auth = require("../middleware/authMiddleware");
const { submitTest } = require("../controllers/testController");

const router = express.Router();

router.post("/submit", auth, submitTest);

module.exports = router;
