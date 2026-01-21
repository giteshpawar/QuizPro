const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, link) => {
  console.log(to);
  await resend.emails.send({
    from: "MCQ Test App <giteshpawar880@gmail.com>",
    to: [to],
    subject: "Reset Your Password",
    html: `
      <h3>Password Reset</h3>
      <p>Click the link below to reset your password:</p>
      <a href="${link}">${link}</a>
      <p>This link expires in 15 minutes.</p>
    `,
  });
};

module.exports = sendEmail;
