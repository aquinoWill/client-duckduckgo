"use client";

import { useState } from "react";
import NextLink from "next/link";
import { Box, Link, Pagination } from "@mui/material";
import { useSearch } from "@/context/SearchContext";

export function ListSearch() {
  const { search } = useSearch();
  const [page, setPage] = useState(1);
  const MAX_PAGE = Math.ceil(search?.length / 10);
  const MAX_ITEM = 10;

  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        my: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {search?.map((item, index) => (
        <Box key={`box_${index}`}>
          <Link href={item?.url} color="secondary" component={NextLink}>
          {item.title}
          </Link>
        </Box>
      )).slice((page - 1) * MAX_ITEM, (page - 1) * MAX_ITEM + MAX_ITEM)}
      <Pagination count={MAX_PAGE} page={page} defaultPage={search?.length / MAX_ITEM} color="primary" onChange={handleChangePagination} />
    </Box>
  );
}

export default ListSearch;
