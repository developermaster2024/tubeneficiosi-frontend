import { Swiper, SwiperSlide } from 'swiper/react';
import banner1 from '../assets/images/banner.jpg';
import banner2 from '../assets/images/banner2.jpg';

const HomeSlider = () => {
  return <Swiper
    navigation
    pagination={{ clickable: true }}
    onSlideChange={() => console.log('slide change')}
    onSwiper={(swiper) => console.log(swiper)}
  >
    <SwiperSlide>
      <img
        src={banner1}
        alt=""
        className="h-72 w-full"
      />
    </SwiperSlide>
    <SwiperSlide>
      <img
        src={banner2}
        alt=""
        className="h-72 w-full"
      />
    </SwiperSlide>
  </Swiper>;
};

export default HomeSlider;