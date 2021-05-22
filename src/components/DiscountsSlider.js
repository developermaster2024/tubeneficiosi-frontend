import { Swiper, SwiperSlide } from 'swiper/react';
import DiscountCard from "./DiscountCard";

const DiscountsSlider = ({discounts}) => {
  return <Swiper
    slidesPerView={'auto'}
    spaceBetween={20}
    scrollbar={true}
  >
    {discounts.map((discount, i) => <SwiperSlide
      key={i}
      style={{width: 'auto'}}
    >
      <DiscountCard
        title={discount.title}
        subtitle={discount.subtitle}
        color={discount.color}
      />
    </SwiperSlide>)}
  </Swiper>;
};

export default DiscountsSlider;