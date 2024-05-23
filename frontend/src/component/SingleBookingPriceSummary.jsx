const SingleBookingPriceSummary = ({ singleBooking }) => {
  return (
    <li className="single_booking_price">
      <span className="single_booking_summary_name">
        {singleBooking.serviceName}
      </span>
      <span className="single_booking_summary_price">
        ${singleBooking.servicePrice}
      </span>
    </li>
  );
};

export default SingleBookingPriceSummary;
