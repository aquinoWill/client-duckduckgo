'use client';

import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { InputSearch, ListSearch, Loading } from '@/components';
import { fetchHistorySearch } from "@/actions/useSearchApi";
import { useSearch } from "@/context/SearchContext";

export function Search() {
  const { setSaveHistorySearch, setSearch } = useSearch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSaveData = async () => {
      const { list } = await fetchHistorySearch();
      setSaveHistorySearch(list);
    };

    fetchSaveData();
    setIsLoading(false);
  }, [setSaveHistorySearch, setSearch]);


  return (
    isLoading ? (
      <Loading />
    ) : (
      <Box>
        <InputSearch />
        <ListSearch />
      </Box>
    )
  )
}
