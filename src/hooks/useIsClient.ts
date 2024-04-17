import { useEffect, useState } from "react";

/** Check is mouted or not */
export function useIsClient() {
  const [isClient, setClient] = useState<boolean>(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return isClient;
}
