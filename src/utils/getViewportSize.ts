import { useEffect, useState } from "react";

type WindowDimensions = {
  width: number;
  height: number;
};

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

export const useWindowDimensions = () => {
  const hasWindow = typeof window !== "undefined";
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>(
    hasWindow ? getWindowDimensions() : { width: 1440, height: 968 },
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(
        hasWindow ? getWindowDimensions() : { width: 1440, height: 968 },
      );
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [hasWindow]);

  return { windowDimensions };
};
