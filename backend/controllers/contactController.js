const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, msg: "Missing fields" });
    }

    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: [process.env.RECEIVER_EMAIL],
      subject: `New Contact Message from ${name}`,
      html: `
        <h3>New Contact Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("CONTACT MAIL ERROR:", error);
    res.status(500).json({ success: false });
  }
};
