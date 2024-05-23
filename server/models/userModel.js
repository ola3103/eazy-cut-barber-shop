const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please provide your full name"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: [true, "Email already exist please use another email"],
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "user"],
        message: "`{VALUE}` is not an option",
      },
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verified: Date,
    verificationToken: String,
    verificationTokenExpiresIn: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
