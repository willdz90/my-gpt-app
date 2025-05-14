import { useMemo, useState } from 'react';

export function usePagination(data = [], initialLimit = 15) {
  const [offset, setOffset] = useState(0);
  const limit = initialLimit;
  const total = data.length;

  const currentPageData = useMemo(() => data.slice(offset, offset + limit), [data, offset]);
  const start = offset + 1;
  const end = Math.min(offset + limit, total);

  const canPrev = offset > 0;
  const canNext = offset + limit < total;

  const nextPage = () => {
    if (canNext) setOffset(offset + limit);
  };

  const prevPage = () => {
    if (canPrev) setOffset(Math.max(0, offset - limit));
  };

  const setPage = (pageNumber) => {
    const newOffset = (pageNumber - 1) * limit;
    if (newOffset >= 0 && newOffset < total) setOffset(newOffset);
  };

  return {
    offset,
    limit,
    total,
    start,
    end,
    currentPageData,
    nextPage,
    prevPage,
    setPage,
    canNext,
    canPrev,
  };
}
