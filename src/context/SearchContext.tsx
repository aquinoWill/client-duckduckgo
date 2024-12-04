"use client";

import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

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
  saveSearch: [],
  setSaveSearch: () => {},
};

interface SearwchContextProps {
  search: ListSearchTypes[];
  setSearch: Dispatch<SetStateAction<ListSearchTypes[]>>; // arrumar
  saveSearch: SaveSearchTypes[];
  setSaveSearch: (saveSearch: SaveSearchTypes[]) => void;
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
  const [saveSearch, setSaveSearch] = useState<SaveSearchTypes[]>([]);

  return (
    <SearchContext.Provider value={{ search, setSearch, saveSearch, setSaveSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
