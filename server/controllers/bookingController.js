const Booking = require("../models/bookingModel");
const CustomError = require("../errors/customError");
const Service = require("../models/servicesModel");
const User = require("../models/userModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createBookingSession = async (req, res) => {
  const { bookingSummary, bookingId } = req.body;

  const lineItems = bookingSummary.map((service) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: service.serviceName,
        },
        unit_amount: service.servicePrice * 100,
      },
      quantity: 1,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url:
      process.env.NODE_ENV === "production"
        ? `https://eazy-cut.vercel.app/bookings`
        : "http://localhost:5173/bookings",
    cancel_url:
      process.env.NODE_ENV === "production"
        ? `https://eazy-cut.vercel.app/home`
        : "http://localhost:5173/home",
    client_reference_id: bookingId,
    customer_email: req.user.email,
  });

  res.status(200).json({ id: session.id, session });
};

exports.webhookCheckout = async (req, res, next) => {
  const signature = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type === "checkout.session.completed") {
    const checkoutSessionCompleted = event.data.object;
    const bookingId = checkoutSessionCompleted.client_reference_id;
    const user = (
      await User.findOne({ email: checkoutSessionCompleted.customer_email })
    )._id;
    const booking = await Booking.findOne({ _id: bookingId, user });
    booking.isBooked = true;
    booking.paid = true;
    await booking.save({ validateBeforeSave: false });
  }

  res.status(200).json({ received: true });
};

exports.createBooking = async (req, res) => {
  const newBooking = await Booking.create({
    ...req.body,
    user: req.user.userId,
  });

  const booking = await Booking.findOne({ _id: newBooking._id })
    .populate("services")
    .populate({
      path: "user",
      select: "fullName email",
    });

  res.status(201).json({
    status: "success",
    message: "Booking created successfully",
    data: booking,
  });
};

exports.getAllBookingForSingleUser = async (req, res) => {
  const bookings = await Booking.find({ user: req.user.userId }).populate(
    "services"
  );

  res
    .status(200)
    .json({ status: "success", totalBooking: bookings.length, data: bookings });
};

exports.getSingleBookingForUser = async (req, res) => {
  const { bookingId } = req.params;

  const booking = await Booking.findOne({
    _id: bookingId,
    user: req.user.userId,
  });

  if (!booking) {
    throw new CustomError(`Booking with id: ${bookingId} cannot be found`, 404);
  }

  res.status(200).json({ status: "success", data: booking });
};

exports.deleteBookingForUser = async (req, res) => {
  const { bookingId } = req.params;

  const booking = await Booking.findOneAndDelete({
    _id: bookingId,
    user: req.user.userId,
  });

  if (!booking) {
    throw new CustomError(`Booking with id: ${bookingId} cannot be found`, 404);
  }

  res
    .status(200)
    .json({ status: "success", message: "Booking successfully deleted" });
};
