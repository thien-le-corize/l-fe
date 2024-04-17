import { RefObject } from "react";
import { isObject } from "@/utils/object";

export function getHeight(
  selectorOrElOrRef: string | HTMLElement | RefObject<HTMLElement>,
): number | undefined {
  if (typeof selectorOrElOrRef === "string") {
    // type guard for string
    const element = document.querySelector(selectorOrElOrRef);
    return element ? element.getBoundingClientRect().height : undefined;
  }

  if (selectorOrElOrRef instanceof HTMLElement) {
    // type guard for HTMLElement
    return selectorOrElOrRef.getBoundingClientRect().height;
  }

  if (isObject(selectorOrElOrRef) && "current" in selectorOrElOrRef) {
    // type guard for RefObject
    const element = selectorOrElOrRef.current;
    return element ? element.getBoundingClientRect().height : undefined;
  }

  // Invalid input
  throw new Error("Invalid input");
}

export function getWidth(
  selectorOrElOrRef: string | HTMLElement | RefObject<HTMLElement>,
): number | undefined {
  if (typeof selectorOrElOrRef === "string") {
    // type guard for string
    const element = document.querySelector(selectorOrElOrRef);
    return element ? element.getBoundingClientRect().width : undefined;
  }

  if (selectorOrElOrRef instanceof HTMLElement) {
    // type guard for HTMLElement
    return selectorOrElOrRef.getBoundingClientRect().width;
  }

  if (isObject(selectorOrElOrRef) && "current" in selectorOrElOrRef) {
    // type guard for RefObject
    const element = selectorOrElOrRef.current;
    return element ? element.getBoundingClientRect().width : undefined;
  }

  // Invalid input
  throw new Error("Invalid input");
}

export function getRect(
  selectorOrElOrRef: string | HTMLElement | RefObject<HTMLElement>,
) {
  if (typeof selectorOrElOrRef === "string") {
    const element = document.querySelector(selectorOrElOrRef);
    return element ? element.getBoundingClientRect() : undefined;
  }

  if (selectorOrElOrRef instanceof HTMLElement) {
    return selectorOrElOrRef.getBoundingClientRect();
  }

  if (isObject(selectorOrElOrRef) && "current" in selectorOrElOrRef) {
    const element = selectorOrElOrRef.current;
    return element ? element.getBoundingClientRect() : undefined;
  }

  throw new Error("Invalid input");
}
