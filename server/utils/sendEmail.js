// const nodemailer = require("nodemailer");
// const CustomError = require("../errors/customError");

// const sendEmail = async ({ to, html, subject }) => {
//   const transporter = nodemailer.createTransport({

//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     secure: false,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const mailOptions = { from: process.env.EMAIL_USER, to, subject, html };

//   transporter.sendMail(mailOptions, function (err, info) {
//     if (err) {
//       console.log(err);
//       throw new CustomError("Error sending email", 500);
//     }
//   });
// };

// module.exports = sendEmail;

const nodemailer = require("nodemailer");
const CustomError = require("../errors/customError");

const sendEmail = async ({ to, html, subject }) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
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
