import { atom, useAtom } from "jotai";
import { debounce } from "lodash";
import { useCallback, useEffect } from "react";

export const matches = atom<boolean | null>(null);
/** Query media */
export default function useMediaQuery(query: string) {
  const [isMatches, setMatches] = useAtom(matches);

  const setMatchesDebounce = useCallback(
    (matches: boolean) => {
      debounce((matches) => setMatches(matches), 500)(matches);
    },
    [setMatches],
  );

  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== isMatches) {
      setMatches(media.matches);
    }

    const listener = () => setMatchesDebounce(media.matches);
    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, [isMatches, query, setMatches, setMatchesDebounce]);
}

// Example  const smallScreen = useMediaQuery('(max-width: 767px)');
