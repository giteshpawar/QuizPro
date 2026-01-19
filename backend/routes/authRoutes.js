const express = require("express");
const { register, login,forgotPassword,resetPasswordWithToken} = require("../controllers/authcontroller");

const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPasswordWithToken);


module.exports = router;
