'use client';
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useAtomValue } from "jotai";
import { RefObject } from "react";
import {
  menuHide,
  menuShow,
  staggerLinks,
} from "@/app/components/animations/header";
// eslint-disable-next-line no-restricted-imports
import { headerHeightInit } from "../layoutCom";

const useHeaderAnimation = (
  headerContainer: RefObject<HTMLDivElement>,
) => {
  const headerHeight = useAtomValue(headerHeightInit);

  const { contextSafe } = useGSAP({ scope: headerContainer });

  const staggerLinksAnimate = contextSafe(() =>
    staggerLinks([
      ".home-menu",
      ".about-us-menu",
      ".service-menu",
      ".our-clients-menu",
      ".career-and-new-menu",
    ]),
  );

  const handleShowAnimate = contextSafe(() => {
    gsap.to([".menu-content-wrapper", ".menu-content"], {
      height: `calc(100vh - ${headerHeight}px)`,
      maxHeight: `calc(100vh - ${headerHeight}px)`,
    });
    menuShow([".menu-content-wrapper", ".menu-content"]);
    staggerLinksAnimate();
  });

  const handleHideAnimate = contextSafe(() => {
    menuHide([".menu-content-wrapper", ".menu-content"]);
    gsap.to(".menu-content", {
      height: 0,
      maxHeight: 0,
    });
  });

  return { handleShowAnimate, handleHideAnimate };
  
};

export default useHeaderAnimation
