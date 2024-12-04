'use client';

import { useEffect } from 'react';
import { InputSearch, ListSearch } from '@/components';
import { useReadSearch, useSearchList } from "@/actions/useSearchApi";
import { useSearch } from "@/context/SearchContext";

export function Search() {
  const { fetchReadSearchData } = useReadSearch();
  const { fetchSearchList } = useSearchList();
  const { setSaveSearch, setSearch } = useSearch();

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
  }, []);

  return (
    <>
      <InputSearch />
      <ListSearch />
    </>
  );
}
