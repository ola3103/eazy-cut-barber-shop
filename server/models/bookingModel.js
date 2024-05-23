const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    services: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Service",
      },
    ],
    bookingDateAndTime: {
      type: String,
      required: [true, "This field is required"],
      unique: [true, "Slot is already taken, please chose another slot"],
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    additionalRequest: String,
    paid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
