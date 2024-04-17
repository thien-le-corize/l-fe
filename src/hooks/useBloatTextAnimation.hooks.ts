import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap-trial/dist/SplitText";
import { RefObject, useCallback } from "react";

export type OptionsType = {
  delay: number;
  duration: number;
  type: "words" | "chars" | "lines";
};

export const useBloatTextAnimation = <
  T extends HTMLElement,
  K extends HTMLElement,
>(
  scope: RefObject<T>,
  target: RefObject<K>,
  { delay = 0, duration = 0, type = "words" }: OptionsType,
) => {
  const handleBloatText = useCallback(() => {
    const splitText = new SplitText(target.current, {
      type: "chars,words,lines",
      linesClass: "clip-text",
    });

    gsap.fromTo(
      splitText[type],
      {
        opacity: 0,
        autoAlpha: 0,
        yPercent: 150,
      },
      {
        opacity: 1,
        autoAlpha: 1,
        yPercent: 0,
        duration,
        ease: "expo.out",
        delay,
        stagger: {
          each: 0.02,
          from: "random",
        },
        scrollTrigger: {
          trigger: scope.current,
          start: "bottom 105%-=100px",
          end: "+=500",
          markers: true,
        },
      },
    );

    return () => {
      splitText.revert();
    };
  }, [delay, duration, scope, target, type]);

  useGSAP(handleBloatText, { scope });
};
