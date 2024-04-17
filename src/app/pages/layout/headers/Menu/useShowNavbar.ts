import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { RefObject, useCallback } from "react";

const useShowNavbar = (scope: RefObject<HTMLUListElement>) => {
  const handleShowHeader = useCallback(() => {
    gsap.from(
      [
        ".home-menu",
        ".about-us-menu",
        ".service-menu",
        ".our-clients-menu",
        ".career-and-new-menu",
      ],
      {
        opacity: 0,
        duration: 0.75,
        ease: "ease-out",
      },
    );
  }, []);

  useGSAP(() => handleShowHeader(), { scope });
};

export default useShowNavbar