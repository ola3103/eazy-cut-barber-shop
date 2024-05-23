const SectionThree = () => {
  return (
    <section className="section_3">
      <div className="section_3_container container">
        <div className="section_3_1">
          <div className="section_3_line"></div>
          <img
            src="https://res.cloudinary.com/dxaujswz7/image/upload/v1714651940/section_3_vk95ky.jpg"
            alt=""
            className="section_3_img"
          />
        </div>
        <div className="section_3_2">
          <h2 className="section_3_2_header">Working hours</h2>
          <p className="section_3_2_text">
            Our hours are flexible and convenient, with early morning and late
            evening appointments available
          </p>
          <p className="single_working_hours">
            <span className="single_working_hrs_days">Weekdays</span>
            <span className="single_working_hrs_time">10AM - 10PM</span>
          </p>
          <p className="single_working_hours">
            <span className="single_working_hrs_days">Weekends</span>
            <span className="single_working_hrs_time">12PM - 10PM</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionThree;
