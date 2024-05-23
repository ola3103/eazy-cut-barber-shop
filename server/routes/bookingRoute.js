const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const bookingController = require("../controllers/bookingController");

router.post(
  "/create-checkout-session",
  authController.protect,
  bookingController.createBookingSession
);
router.post("/", authController.protect, bookingController.createBooking);
router.get(
  "/",
  authController.protect,
  bookingController.getAllBookingForSingleUser
);
router.get(
  "/:bookingId",
  authController.protect,
  bookingController.getSingleBookingForUser
);
router.delete(
  "/:bookingId",
  authController.protect,
  bookingController.deleteBookingForUser
);

module.exports = router;
