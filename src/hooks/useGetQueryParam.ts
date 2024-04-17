import { useSearchParams } from "next/navigation";

export const useGetQueryParam = (queryParam: string) => {
  const searchParams = useSearchParams();
  return searchParams?.get(queryParam);
};
