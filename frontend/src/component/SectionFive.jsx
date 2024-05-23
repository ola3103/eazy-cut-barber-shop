import { Link } from "react-router-dom";

const SectionFive = () => {
  return (
    <section className="section_5">
      <div className="section_5_container container">
        <div className="section_5_header_box">
          <h1 className="section_5_header">Book your</h1>
          <h1 className="section_5_header">appointment online</h1>
        </div>
        <p className="section_5_text">
          Schedule your next haircut service online. Our online booking is fast
          and available 24/7. Book now and get ready to look your best
        </p>
        <Link to="/sign-in" className="general_btn banner_btn">
          Make Appointment
        </Link>
      </div>
    </section>
  );
};

export default SectionFive;
