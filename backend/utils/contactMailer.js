const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendContactMail = async (fromEmail, message) => {
  await resend.emails.send({
    from: "Contact Us <onboarding@resend.dev>",
    to: [process.env.RECEIVER_EMAIL],
    subject: "New Contact Us Message",
    html: `
      <h3>New Message from Contact Us</h3>
      <p><strong>From:</strong> ${fromEmail}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  });
};

module.exports = sendContactMail;
