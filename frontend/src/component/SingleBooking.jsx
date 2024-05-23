const SingleBooking = ({ book }) => {
  const convertDate = (inputDate) => {
    const dateObj = new Date(inputDate);

    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][dateObj.getMonth()];

    const date = dateObj.getDate();
    const year = dateObj.getFullYear();

    const formattedDate = `${date} ${month}, ${year}`;

    return formattedDate;
  };
  return (
    <>
      <tr>
        <td className="date_cell">{convertDate(book.createdAt)}</td>
        <td>{`bk ${book._id}`}</td>
        <td>{book.bookingDateAndTime}</td>
        <td className="services_cell">
          {book.services.map((service) => service.serviceName).join(", ")}
        </td>
        <td>
          $
          {`${book.services.reduce(
            (accumulator, currentValue) =>
              accumulator + currentValue.servicePrice,
            0
          )}`}
        </td>
        <td>{book.paid === true ? "Paid" : "Unpaid"}</td>
      </tr>
    </>
  );
};

export default SingleBooking;
