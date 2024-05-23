import SingleService from "./SingleService";

const SectionTwo = () => {
  return (
    <section className="section_2">
      <div className="section_2_container container">
        <h1 className="section_2_header">Our Services</h1>
        <p className="section_2_text">
          Indulge in an array of premium grooming services tailored to suit your
          individual style and preferences. From precision haircuts and beard
          trims to luxurious hot towel shaves, our expert barbers deliver
          unparalleled craftsmanship and attention to detail with every service.
          Step into our sanctuary of sophistication and elevate your grooming
          routine to new heights.
        </p>
        <div className="service_box">
          <SingleService
            imgSrc="https://res.cloudinary.com/dxaujswz7/image/upload/v1714651940/service_1_rgwdyt.jpg"
            smallImgSrc="https://res.cloudinary.com/dxaujswz7/image/upload/v1714652008/service_small_1_zlgzhi.png"
            serviceType="Shaving"
            servicePrice={29}
          />
          <SingleService
            imgSrc="https://res.cloudinary.com/dxaujswz7/image/upload/v1714651963/service_3_ukgjbb.jpg"
            smallImgSrc="https://res.cloudinary.com/dxaujswz7/image/upload/v1714652552/service_small_2_h6idkd.png"
            serviceType="Hair Treatment"
            servicePrice={85}
          />
          <SingleService
            imgSrc="https://res.cloudinary.com/dxaujswz7/image/upload/v1714651984/service_4_kiua5r.jpg"
            smallImgSrc="https://res.cloudinary.com/dxaujswz7/image/upload/v1714653803/service_small_4_mjlloc.png"
            serviceType="Styling"
            servicePrice={52}
          />
          <SingleService
            imgSrc="https://res.cloudinary.com/dxaujswz7/image/upload/v1714651940/service_2_a53eq4.jpg"
            smallImgSrc="https://res.cloudinary.com/dxaujswz7/image/upload/v1714653803/service_small_3_gp7vpr.png"
            serviceType="HairCutting"
            servicePrice={67}
          />
        </div>
      </div>
    </section>
  );
};

export default SectionTwo;
