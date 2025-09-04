import React, { type PropsWithChildren } from "react";
import { Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import "./SwiperNavigation.style.scss";
interface SwiperNavigationProps extends PropsWithChildren {
  spaceBetween?: number;
  className: string;
}

const SwiperNavigation: React.FC<SwiperNavigationProps> = ({
  children,
  spaceBetween = 8,
  className,
}) => {
  return (
    <Swiper
      navigation
      modules={[Navigation]}
      spaceBetween={spaceBetween}
      slidesPerView={"auto"}
      pagination={{ clickable: true }}
      className={className}
    >
      {children}
    </Swiper>
  );
};

export default SwiperNavigation;
