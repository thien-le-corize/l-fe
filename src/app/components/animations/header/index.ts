import gsap from "gsap";

type TweenTarget = string | object | null;

export const staggerLinks = (elements: TweenTarget[]) => {
  gsap.from(elements, {
    duration: 0.8,
    y: 100,
    delay: 0.1,
    ease: "power4.inOut",
    stagger: {
      amount: 0.3,
    },
  });
};

export const menuHide = (elements: TweenTarget[]) => {
  gsap.to(elements, {
    duration: 0.8,
    height: 0,
    ease: "power4.inOut",
    stagger: {
      amount: 0.07,
    },
  });
};

export const menuShow = (elements: TweenTarget[]) => {
  gsap.from(elements, {
    duration: 0.7,
    transformOrigin: "right top",
    skewY: 2,
    ease: "power4.inOut",
    stagger: {
      amount: 0.2,
    },
  });
};
