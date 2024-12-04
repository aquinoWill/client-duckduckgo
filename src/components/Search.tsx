'use client';

import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { InputSearch, ListSearch, Loading } from '@/components';
import { useReadSearch, useSearchList } from "@/actions/useSearchApi";
import { useSearch } from "@/context/SearchContext";

export function Search() {
  const { fetchReadSearchData } = useReadSearch();
  const { fetchSearchList } = useSearchList();
  const { setSaveSearch, setSearch } = useSearch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaveData = async () => {
      const { list } = await fetchReadSearchData();
      setSaveSearch(list);
    };

    const fetchListData = async () => {
      const data = await fetchSearchList();
      setSearch(data);
    };

    fetchSaveData();
    fetchListData();
    setLoading(false);
  }, []);


  return (
    loading ? (
      <Loading />
    ) : (
      <Box>
        <InputSearch />
        <ListSearch />
      </Box>
    )
  )
}
