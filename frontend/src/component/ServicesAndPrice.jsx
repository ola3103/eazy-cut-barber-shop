import { GlobalUserContext } from "../context/UserContext";
import SingleServicesPrice from "./SingleServicesPrice";

const ServicesAndPrice = () => {
  const { serviceData } = GlobalUserContext();

  const allService = serviceData.map((service) => {
    return <SingleServicesPrice key={service._id} service={service} />;
  });
  return (
    <div className="service_price_section">
      <h1 className="service_price_header">Price List</h1>
      <ul className="service_price_list">{allService}</ul>
    </div>
  );
};

export default ServicesAndPrice;
