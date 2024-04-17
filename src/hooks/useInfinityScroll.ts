import { useState } from "react";
type InfiniteScroll<T> = {
  data: T[];
  size?: number;
  disabled?: boolean;
};
const DEFAULT_SIZE = 10;
/** Infinity scroll hook */
export const useInfiniteScroll = <T>({
  data,
  size = DEFAULT_SIZE,
  disabled = false,
}: InfiniteScroll<T>) => {
  const [page, setPage] = useState(1);

  // Function to handle "Load More" button click
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Sliced list items based on the page and size
  const listItems = disabled ? data : data.slice(0, size * page);

  return {
    listItems,
    disabledButton: data.length === listItems.length,
    handleLoadMore,
  };
};
