const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const CustomError = require("../errors/customError");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");

exports.protect = async (req, res, next) => {
  const token = req.cookies.auth_token;
  if (!token) {
    throw new CustomError("Please log in no token available", 400);
  }
  const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findOne({ _id: payload.userId });

  if (!user) {
    throw new CustomError("User does not exist", 400);
  }

  req.user = payload;

  next();
};

exports.authorizedUser = (role) => {
  return async (req, res, next) => {
    if (role !== req.user.role) {
      throw new CustomError(
        "You are not authorized to perform this action",
        401
      );
    }
    next();
  };
};

exports.registerUser = async (req, res) => {
  const { fullName, email, password, role } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new CustomError("Email already exist", 400);
  }

  if (role === "admin") {
    throw new CustomError("You are not authorized to perform this action", 401);
  }

  const beforeTokenHashed = crypto.randomBytes(40).toString("hex");
  const verificationToken = crypto
    .createHash("sha256")
    .update(beforeTokenHashed)
    .digest("hex");

  const user = await User.create({
    fullName,
    email,
    password,
    verificationToken,
    verificationTokenExpiresIn: Date.now() + 10 * 1000 * 60,
  });
  try {
    const verificationUrl =
      process.env.NODE_ENV === "production"
        ? `${req.protocol}://${req.get(
            "host"
          )}/verify-email?token=${verificationToken}&email=${email}`
        : `${req.protocol}://localhost:5173/verify-email?token=${verificationToken}&email=${email}`;
    const htmlContent = `<h1>Hello ${user.fullName}</h1>
    <p>Kindly click on the link to verify your account ${verificationUrl}</p>
    <p>Kindly note that this link expires in 10 minutes</p>
    `;
    await sendEmail({
      to: email,
      html: htmlContent,
      subject: "Verify your account",
    });
  } catch (error) {
    user.verificationToken = undefined;
    user.verificationTokenExpiresIn = undefined;
    await User.findOneAndDelete({ email });
    throw new CustomError(
      "There was problem sending email, please try again",
      500
    );
  }
  res.status(200).json({
    status: "success",
    message: "check your email to verify your account",
  });
};

exports.verifyEmail = async (req, res) => {
  const { email, token } = req.body;
  if (!email || !token) {
    throw new CustomError("No token or email provided", 400);
  }
  const user = await User.findOne({
    email,
  });

  if (Date.now() > user.verificationTokenExpiresIn) {
    throw new CustomError("Token has expired", 400);
  }

  if (!user) {
    user.verificationToken = undefined;
    user.verificationTokenExpiresIn = undefined;
    throw new CustomError("Invalid user or token", 400);
  }

  if (token !== user.verificationToken) {
    throw new CustomError("Verification failed", 400);
  }

  user.isVerified = true;
  user.verified = Date.now();
  user.verificationToken = "";
  user.verificationTokenExpiresIn = undefined;

  await user.save({ validateBeforeSave: false });

  const tokenObj = { userId: user._id, role: user.role, email: user.email };

  const jwtToken = jwt.sign(tokenObj, process.env.JWT_SECRET_KEY, {
    expiresIn: "90d",
  });

  res.cookie("auth_token", jwtToken, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({
    status: "success",
    message: "Account verification successful",
  });
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError("Provide email and password", 400);
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError("Incorrect password or email", 400);
  }

  const passwordCorrect = await bcrypt.compare(password, user.password);
  if (!passwordCorrect) {
    throw new CustomError("Incorrect password or email", 400);
  }

  if (!user.isVerified) {
    throw new CustomError("Account not verified", 400);
  }

  const jwtToken = jwt.sign(
    { userId: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "90d",
    }
  );

  res.cookie("auth_token", jwtToken, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  const userObj = {
    fullName: user.fullName,
    email: user.email,
  };

  res.status(200).json({
    status: "success",
    message: `Welcome ${user.fullName}`,
    data: userObj,
  });
};

exports.getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId }).select(
    "fullName email"
  );
  res
    .status(200)
    .json({ status: "success", message: "current user", data: user });
};

exports.logoutUser = async (req, res) => {
  res.cookie("auth_token", "logout user", {
    expires: new Date(Date.now()),
    secure: true,
    httpOnly: process.env.NODE_ENV === "production",
  });

  res.status(200).json({ status: "success", message: "log out successful" });
};
