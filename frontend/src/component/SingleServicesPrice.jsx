const SingleServicesPrice = ({ service }) => {
  return (
    <li className="single_service_price">
      <span className="single_service_text">{service.serviceName}</span>
      <span className="single_price">${service.servicePrice}</span>
    </li>
  );
};

export default SingleServicesPrice;
