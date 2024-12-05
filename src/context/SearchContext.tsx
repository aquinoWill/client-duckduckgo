"use client";

import React, { createContext, useContext, useState } from "react";

type ListSearchTypes = {
  url: string;
  title: string;
};

type SaveSearchTypes = {
  query: string;
};

const initialState: SearwchContextProps = {
  search: [],
  setSearch: () => {},
  saveHistorySearch: [],
  setSaveHistorySearch: () => {},
};

interface SearwchContextProps {
  search: ListSearchTypes[];
  setSearch: (search: ListSearchTypes[]) => void;
  saveHistorySearch: SaveSearchTypes[];
  setSaveHistorySearch: (saveSearch: SaveSearchTypes[]) => void;
}

const SearchContext = createContext<SearwchContextProps>(initialState);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [search, setSearch] = useState<ListSearchTypes[]>([]);
  const [saveHistorySearch, setSaveHistorySearch] = useState<SaveSearchTypes[]>(
    []
  );

  return (
    <SearchContext.Provider
      value={{ search, setSearch, saveHistorySearch, setSaveHistorySearch }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
