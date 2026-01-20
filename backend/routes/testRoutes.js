const express = require("express");
const auth = require("../middleware/authMiddleware");
const { submitTest } = require("../controllers/testController");

const router = express.Router();

router.post("/submit", submitTest);

module.exports = router;
