import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { GlobalUserContext } from "../context/UserContext";
import SingleServiceLabelInput from "./SingleServiceLabelInput";
import SingleBookingPriceSummary from "./SingleBookingPriceSummary";
import notification from "../utils/notification";
import Loader from "./Loader";

const BookingForm = () => {
  const { user, serviceData } = GlobalUserContext();
  const [dateValue, setDateValue] = useState(new Date());
  const [isToday, setIsToday] = useState(false);
  const [bookingSummary, setBookingSummary] = useState([]);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: `${user.fullName}`,
      email: `${user.email}`,
    },
  });

  const hasServicesError = errors && errors.services;
  const hasBookingTimeError = errors && errors.bookingDateAndTime;

  const onChange = (nextValue) => {
    setDateValue(nextValue);
  };

  useEffect(() => {
    const today = new Date();

    const checkDateMatch =
      today.getFullYear() === dateValue.getFullYear() &&
      today.getMonth() === dateValue.getMonth() &&
      today.getDate() === dateValue.getDate();

    setIsToday(checkDateMatch);
  }, [dateValue]);

  const date = new Date(dateValue);

  const options = { weekday: "long", month: "long", day: "2-digit" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  const serviceArray = watch("services");

  useEffect(() => {
    if (serviceArray && serviceData) {
      const selectedServices = serviceData.filter((service) =>
        serviceArray.includes(service._id)
      );
      setBookingSummary(selectedServices);
    } else {
      setBookingSummary([]);
    }
  }, [serviceArray, serviceData]);

  const allServiceLabelInput = serviceData.map((serviceLabelInput) => {
    return (
      <SingleServiceLabelInput
        key={serviceLabelInput._id}
        serviceLabelInput={serviceLabelInput}
        register={register}
        error={errors?.services}
      />
    );
  });

  const allBookingPriceSummary = bookingSummary.map((singleBooking) => (
    <SingleBookingPriceSummary
      key={singleBooking._id}
      singleBooking={singleBooking}
    />
  ));

  const onSubmit = async (data) => {
    const stripe = await loadStripe(
      `${import.meta.env.VITE_STRIPE_SECRET_KEY}`
    );
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_API_BASE_URL ||
          import.meta.env.VITE_API_BASE_URL_PROD
        }/api/v1/booking`,
        data,
        { withCredentials: true }
      );

      console.log(response);
      const bookingId = response.data.data._id;

      const stripeResponse = await axios.post(
        `${
          import.meta.env.VITE_API_BASE_URL ||
          import.meta.env.VITE_API_BASE_URL_PROD
        }/api/v1/booking/create-checkout-session`,
        { bookingSummary, bookingId },

        { withCredentials: true }
      );

      const result = stripe.redirectToCheckout({
        sessionId: stripeResponse.data.id,
      });
    } catch (error) {
      notification({ status: "error", message: error.response.data.message });
    }
  };

  if (!serviceData) {
    return <Loader />;
  }

  return (
    <form
      className="booking_form"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="booking_form_container">
        <div className="logo_booking_page">
          <img
            src="https://res.cloudinary.com/dxaujswz7/image/upload/v1714651939/logo_btwft1.png"
            alt="logo"
            className="logo"
          />
        </div>
        <p className="booking_form_header">
          Book your appointment now and step into style!
        </p>
        <label className="booking_form_label">
          Full Name
          <input
            {...register("fullName", {
              required: "Please provide your name",
            })}
            type="text"
            className="booking_form_input"
            readOnly="readOnly"
          />
        </label>
        <label className="booking_form_label">
          Email
          <input
            {...register("email", {
              required: "Please provide your email",
            })}
            type="Email"
            className="booking_form_input"
            readOnly="readOnly"
          />
        </label>
        <div className="booking_form_date_time_box">
          <p className="booking_date_warning_text">
            Please be aware that booking is only available for future dates;
            booking for the present day is not allowed.
          </p>
          <div className="booking_form_date">
            <Calendar
              className="form_date"
              onChange={onChange}
              value={dateValue}
              minDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
            />
          </div>
          <div className="booking_slot">
            <p className="booking_time_selected_date">{formattedDate}</p>
            {isToday ? null : (
              <div className="booking_slot_time_box">
                <label className="booking_slot_label">
                  <input
                    {...register("bookingDateAndTime", {
                      required: "Please select one booking time",
                    })}
                    type="radio"
                    className="booking_slot_input"
                    name="bookingDateAndTime"
                    value={`${formattedDate} 10:00 AM`}
                  />
                  10:00 AM
                  <span className="booking_slot_checkmark"></span>
                </label>
                <label className="booking_slot_label">
                  <input
                    {...register("bookingDateAndTime", {
                      required: "Please select one booking time",
                    })}
                    type="radio"
                    className="booking_slot_input"
                    name="bookingDateAndTime"
                    value={`${formattedDate} 12:00 PM`}
                  />
                  12:00 PM
                  <span className="booking_slot_checkmark"></span>
                </label>
                <label className="booking_slot_label">
                  <input
                    {...register("bookingDateAndTime", {
                      required: "Please select one booking time",
                    })}
                    type="radio"
                    className="booking_slot_input"
                    name="bookingDateAndTime"
                    value={`${formattedDate} 02:00 PM`}
                  />
                  02:00 PM
                  <span className="booking_slot_checkmark"></span>
                </label>
                <label className="booking_slot_label">
                  <input
                    {...register("bookingDateAndTime", {
                      required: "Please select one booking time",
                    })}
                    type="radio"
                    className="booking_slot_input"
                    name="bookingDateAndTime"
                    value={`${formattedDate} 04:00 PM`}
                  />
                  04:00 PM
                  <span className="booking_slot_checkmark"></span>
                </label>
                <label className="booking_slot_label">
                  <input
                    {...register("bookingDateAndTime", {
                      required: "Please select one booking time",
                    })}
                    type="radio"
                    className="booking_slot_input"
                    name="bookingDateAndTime"
                    value={`${formattedDate} 06:00 PM`}
                  />
                  06:00 PM
                  <span className="booking_slot_checkmark"></span>
                </label>
                <label className="booking_slot_label">
                  <input
                    {...register("bookingDateAndTime", {
                      required: "Please select one booking time",
                    })}
                    type="radio"
                    className="booking_slot_input"
                    name="bookingDateAndTime"
                    value={`${formattedDate} 10:00 AM`}
                  />
                  08:00 PM
                  <span className="booking_slot_checkmark"></span>
                </label>
              </div>
            )}
            {hasBookingTimeError && (
              <span className="booking_error">
                Please select one booking time
              </span>
            )}
          </div>
        </div>
        <fieldset className="booking_service_box">
          <legend className="booking_service_box_header">
            Types of services
          </legend>
          {allServiceLabelInput}
          {hasServicesError && (
            <span className="booking_error">
              Please select atleast one service
            </span>
          )}
        </fieldset>
        <label className="booking_form_label">
          Additional Request
          <textarea
            {...register("additionalRequest")}
            className="additional_text_input"
            name="additionalRequest"
          />
        </label>
        {bookingSummary.length === 0 ? null : (
          <p className="summary_header">Service summary & price</p>
        )}
        <ul className="booking_price_summary">{allBookingPriceSummary}</ul>
        {bookingSummary.length === 0 ? null : (
          <p className="booking_summary_total">
            <span>Total</span>
            <span>
              $
              {bookingSummary.length === 0
                ? "0.00"
                : bookingSummary.reduce(
                    (accumulator, currentValue) =>
                      accumulator + currentValue.servicePrice,
                    0
                  )}
            </span>
          </p>
        )}

        <button className="submit_booking_btn">Book Now</button>
      </div>
    </form>
  );
};

export default BookingForm;
