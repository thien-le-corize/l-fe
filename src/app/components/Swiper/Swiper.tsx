import { FC } from "react";
import {
  Autoplay,
  Controller,
  Navigation,
  Pagination
} from "swiper/modules";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import Image from 'next/image'

type BannerType = {
  id: number;
  url: string;
};

type Props = {
  banners?: BannerType[];
  config?: SwiperProps;
  onSwiper?: (swiper: SwiperType) => void;
};

export const SwiperSlider: FC<Props> = ({
  banners,
  config,
  onSwiper,
  
}) => {
  

  const breakpoints = {
    0: {slidesPerView:1},
		
		768: {
			slidesPerView: 3,
		},
	
	};

  const defaultConfig = {
    autoplay: { delay: 5000, disableOnInteraction: false, else: "ease-out" },
    controller: { inverse: true },
    spaceBetween: 0,
    speed: 2500,
    breakpoints,
    navigation:true,
      pagination:{ clickable: true },
    ...config,
    modules: [
      Controller,
      Autoplay,
      Navigation,
      Pagination,
      ...(config?.modules ?? []),
    ],
  };

  return (
    <Swiper {...defaultConfig} onSwiper={onSwiper} effect="slide">
      {banners?.map((banner) => (
        <SwiperSlide key={banner.id}><Image src={banner.url} width={600} height={600} alt=""/></SwiperSlide>
      ))}
    </Swiper>
  );
};
