const nodemailer = require("nodemailer");
const CustomError = require("../errors/customError");

const sendEmail = async ({ to, html, subject }) => {
  const transporter = nodemailer.createTransport({
    host: smtp - mail.outlook.com,
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = { from: process.env.EMAIL_USER, to, subject, html };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;
