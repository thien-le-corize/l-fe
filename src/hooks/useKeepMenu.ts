import { useEffect, useState } from "react";
/** Show hie menu */
export function useKeepMenu() {
  const [menuVisible, setMenuVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos <= 50) {
        setMenuVisible(true);
      } else {
        setMenuVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { menuVisible };
}
