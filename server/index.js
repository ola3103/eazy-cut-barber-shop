require("dotenv").config();
require("express-async-errors");

const path = require("path");

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const globalErrorController = require("./controllers/globalErrorController");
const bookingController = require("./controllers/bookingController");
const authRouter = require("./routes/authRoute");
const serviceRouter = require("./routes/serviceRoute");
const bookingRouter = require("./routes/bookingRoute");
const CustomError = require("./errors/customError");
const sendEmail = require("./utils/sendEmail");

app.post(
  "/webhook-checkout",
  express.raw({ type: "application/json" }),
  bookingController.webhookCheckout
);

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? `https://eazy-cut.vercel.app`
        : `http://localhost:5173`,
    credentials: true,
  })
);

app.options("*", cors());

app.get("/test-email", async (req, res) => {
  try {
    await sendEmail({
      to: "wonuolaolakunle@gmail.com",
      subject: "test email",
      html: `<p>Test Email</p>`,
    });
    res.status(200).json({
      message: "Email sent successfully",
    });
  } catch (error) {
    res.status(500).send(`Error sending email: ${error}`);
  }
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/service", serviceRouter);
app.use("/api/v1/booking", bookingRouter);
app.use(globalErrorController);
app.all("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: `${req.originalUrl} cannot be found on this server`,
  });
});

const PORT = 4050 || process.env.PORT;

const startApp = async () => {
  try {
    await mongoose.connect(process.env.URI_CONNECTION_STRING);
    console.log("DB CONNECTED");
    app.listen(PORT, () =>
      console.log(`server is listening on port ${PORT}...`)
    );
  } catch (error) {
    throw new CustomError("Something went wrong, please try again", 500);
  }
};

startApp();
