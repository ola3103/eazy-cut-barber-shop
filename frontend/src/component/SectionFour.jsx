import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const SectionFour = () => {
  return (
    <section className="section_4">
      <div className="section_4_container container">
        <h1 className="section_4_header">Featured gallery</h1>
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            200: {
              slidesPerView: 1,
              spaceBetween: 7,
            },
            425: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            576: {
              slidesPerView: 3,
              spaceBetween: 5,
            },
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img
              src="https://res.cloudinary.com/dxaujswz7/image/upload/v1714651938/gallery_1_yqr59l.jpg"
              alt="gallery_image"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://res.cloudinary.com/dxaujswz7/image/upload/v1714651938/gallery_2_t3aud1.jpg"
              alt="gallery_image"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://res.cloudinary.com/dxaujswz7/image/upload/v1714651938/gallery_5_fdv2tl.jpg"
              alt="gallery_image"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://res.cloudinary.com/dxaujswz7/image/upload/v1714651939/gallery_6_p2kqsh.jpg"
              alt="gallery_image"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://res.cloudinary.com/dxaujswz7/image/upload/v1714651939/gallery_7_awjx3g.jpg"
              alt="gallery_image"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://res.cloudinary.com/dxaujswz7/image/upload/v1714651940/gallery_8_siepts.jpg"
              alt="gallery_image"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://res.cloudinary.com/dxaujswz7/image/upload/v1714651939/gallery_9_bpuua1.jpg"
              alt="gallery_image"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default SectionFour;
