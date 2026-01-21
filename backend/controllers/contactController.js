const sendContactMail = require("../utils/sendContactMail");

exports.sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        msg: "Missing fields",
      });
    }

    await sendContactMail(email, message);

    res.json({ success: true });
  } catch (error) {
    console.error("CONTACT ERROR:", error);
    res.status(500).json({ success: false });
  }
};
