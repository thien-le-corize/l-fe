import { atom, useSetAtom } from "jotai";
import React, { useCallback, useMemo } from "react";
import { Swiper } from "swiper/types";
import { SwiperSlider } from "@/app/components/Swiper";
import Banner1 from "./assets/banner1.png";
import Banner2 from "./assets/banner2.png";
import { styled } from "styled-components";

export const homeSwiper = atom<Swiper | null>(null);

const HomeBanners = () => {
  const setSwiper = useSetAtom(homeSwiper);

  const handleSwiper = useCallback(
    (swiper: Swiper) => {
      setSwiper(swiper);
    },
    [setSwiper]
  );

  const defaultBanners = useMemo(
    () => [
      { id: 1, url: Banner1.src },
      { id: 2, url: Banner2.src },
    ],
    []
  );

  const config = { effect: "fade", modules: [EffectFade, Parallax] };

  return (
    <HomeBannersWrapper>
      <SwiperSlider
        banners={[...defaultBanners, ...defaultBanners]}
        onSwiper={handleSwiper}
        config={config}
      ></SwiperSlider>
    </HomeBannersWrapper>
  );
};

export default HomeBanners;

const HomeBannersWrapper = styled.div`
  position: relative;
`;
