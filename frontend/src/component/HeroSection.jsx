import { Link } from "react-router-dom";
const HeroSection = () => {
  return (
    <section className="hero_section">
      <div className="hero_section_container container">
        <div className="hero_section_1">
          <p className="hero_section_1_header">
            Step into Style: Where Every Cut Tells a Story
          </p>
          <p className="hero_section_1_header">
            Unleash Your Style: Where Precision Meets Personality
          </p>
          <p className="hero_section_1_text">
            Step into our world of timeless grooming. Discover the artistry of
            precision cuts and personalized service. Elevate your style at our
            premier barber shop, where tradition meets innovation.{" "}
          </p>

          <Link to="/sign-in" className="general_btn">
            Book An Appointment
          </Link>
        </div>
        <div className="hero_section_2">
          <div className="img_line"></div>
          <img
            src="https://res.cloudinary.com/dxaujswz7/image/upload/v1714651939/hero_section_rdjbvp.jpg"
            alt="hero_pics"
            className="hero_pics"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
