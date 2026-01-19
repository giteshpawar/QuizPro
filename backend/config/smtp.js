const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, 
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, 
  },
});

transporter.verify((error) => {
  if (error) {
    console.error("SMTP VERIFY FAILED:", error);
  } else {
    console.log("SMTP READY");
  }
});

module.exports = transporter;
