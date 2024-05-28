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
//     authMethod: "PLAIN",
//     tls: {
//       rejectUnauthorized: false,
//     },
//   });

//   const mailOptions = { from: process.env.EMAIL_USER, to, subject, html };

//   // transporter.sendMail(mailOptions, function (err, info) {
//   //   if (err) {
//   //     console.log(err);
//   //     throw new CustomError("Error sending email", 500);
//   //   }
//   // });

//   try {
//     await transporter.sendMail(mailOptions);
//   } catch (error) {
//     console.log(error);
//   }
// };

// module.exports = sendEmail;

const nodemailer = require("nodemailer");
const CustomError = require("../errors/customError");

const sendEmail = async ({ to, html, subject }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = { from: process.env.EMAIL_USER, to, subject, html };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
