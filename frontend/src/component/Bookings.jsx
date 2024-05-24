import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SingleBooking from "./SingleBooking";
import Loader from "./Loader";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    return async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL ||
            import.meta.env.VITE_API_BASE_URL_PROD
          }/api/v1/booking`,
          { withCredentials: true }
        );
        console.log(response);
        setBookings(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  console.log(bookings);

  const allBookings = bookings.map((book) => {
    return <SingleBooking key={book._id} book={book} />;
  });

  if (!bookings) {
    return <Loader />;
  }

  return (
    <section className="booking_section">
      <div className="container">
        {bookings.length === 0 ? (
          <p className="empty_booking_text">
            You haven&apos;t made any bookings yet.
            <Link to="/home">Click Here</Link> to book a spot.
          </p>
        ) : (
          <>
            <div className="booking_container">
              <Link to="/home" className="return_home_btn">
                Return to home page
              </Link>
              <table>
                <tbody>
                  <tr className="table_heading">
                    <th className="table_heading">Booking Date</th>
                    <th className="table_heading">Booking Id</th>
                    <th className="table_heading">Booking Slot</th>
                    <th className="table_heading">Services</th>
                    <th className=" table_heading amount_paid_cell">
                      Amount Paid
                    </th>
                    <th className="table_heading">Payment Status</th>
                  </tr>
                  {allBookings}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Bookings;
