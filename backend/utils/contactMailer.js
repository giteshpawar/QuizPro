const nodemailer = require("nodemailer");

const sendContactMail = async (fromEmail, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: fromEmail,
    to: process.env.SMTP_EMAIL, // your email
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
