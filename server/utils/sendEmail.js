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

  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });

  const mailOptions = { from: process.env.EMAIL_USER, to, subject, html };

  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
};

module.exports = sendEmail;
