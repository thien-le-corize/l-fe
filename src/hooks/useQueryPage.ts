import { useRouter } from "next/router";
const useQueryPage = (): number => {
  const router = useRouter();
  const search = router.pathname;
  const pageFromQuery = new URLSearchParams(search).get("page");
  return pageFromQuery ? Number(pageFromQuery) : 1;
};

export default useQueryPage;
