const SingleService = ({ imgSrc, smallImgSrc, serviceType, servicePrice }) => {
  return (
    <div className="single_service">
      <img
        src={`${imgSrc}`}
        alt="single_service_img"
        className="single_service_img"
      />
      <img
        src={`${smallImgSrc}`}
        alt="single_service_img_2"
        className="single_service_img_2"
      />
      <p className="single_service_text_1">{serviceType}</p>
      <p className="single_service_text_2">
        Price: <span>${servicePrice}</span>
      </p>
    </div>
  );
};

export default SingleService;
