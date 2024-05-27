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

//   // transporter.sendMail(mailOptions, function (err, info) {
//   //   if (err) {
//   //     console.log(err);
//   //     throw new CustomError("Error sending email", 500);
//   //   }
//   // });

//   await new Promise((resolve, reject) => {
//     transporter.sendMail(mailOptions, (err, info) => {
//       if (err) {
//         console.error(err);
//         reject(err);
//       } else {
//         resolve(info);
//       }
//     });
//   });
// };

// module.exports = sendEmail;

const SibApiV3Sdk = require("sib-api-v3-sdk");

const sendEmail = async ({ to, html, subject }) => {
  const defaultClient = SibApiV3Sdk.ApiClient.instance;

  let apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = process.env.BREVO_API_KEY;

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  const sender = { name: "Eazy Cutz", email: process.env.EMAIL_USER };
  const receivers = [{ email: to }];

  try {
    const sendEmail = await apiInstance.sendTransacEmail({
      sender,
      to: receivers,
      subject,
      htmlContent: html,
    });
    console.log(sendEmail);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;
