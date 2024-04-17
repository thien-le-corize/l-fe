import { NextRouter } from "next/router";

type QueryParams = {
  [key: string]: number | string;
};

export const handleRedirect = (
  router: NextRouter,
  queryParams: QueryParams,
) => {
  router.push(
    {
      query: { ...router.query, ...queryParams },
    },
    undefined,
    { shallow: true },
  );
};
