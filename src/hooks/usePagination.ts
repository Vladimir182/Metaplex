import { useMemo, useState } from "react";

export const usePagination = <T>(items: T[] = [], initialItemsPerPage = 10) => {
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [page, setPage] = useState<number>(1);

  const handleSetPage = (selectedPage?: number) => {
    if (selectedPage !== undefined) setPage(selectedPage);
  };

  const pageItems = useMemo(
    () => items.slice((page - 1) * itemsPerPage, page * itemsPerPage),
    [items, page, itemsPerPage]
  );

  return {
    items: pageItems,
    page,
    setPage: handleSetPage,
    itemsPerPage,
    setItemsPerPage,
  };
};
