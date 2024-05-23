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

app.post(
  "/webhook-checkout",
  express.raw({ type: "application/json" }),
  bookingController.webhookCheckout
);

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.options("*", cors());

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
