import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap-trial/dist/SplitText";
import { RefObject, useCallback } from "react";
import { OptionsType } from "./useBloatTextAnimation.hooks";

export const useStaggerTextAnimation = <
  T extends HTMLElement,
  K extends HTMLElement,
>(
  scope: RefObject<T>,
  target: RefObject<K>,
  { delay = 0, duration = 0, type = "words" }: OptionsType,
) => {
  const handleStaggerText = useCallback(() => {
    const splitText = new SplitText(target.current, {
      type: "chars,words,lines",
      linesClass: "clip-text",
    });

    gsap.fromTo(
      splitText[type],
      {
        autoAlpha: 0,
        yPercent: 150,
      },
      {
        autoAlpha: 1,
        yPercent: 0,
        duration,
        ease: "power2.out",
        delay,
        stagger: {
          each: 0.02,
          from: "random",
        },
        scrollTrigger: {
          trigger: scope.current,
          start: "bottom 105%-=100px",
          end: "+=500",
        },
      },
    );

    return () => {
      splitText.revert();
    };
  }, [delay, duration, scope, target, type]);

  useGSAP(handleStaggerText, { scope });
};
