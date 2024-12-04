"use client";

import React, {
  useEffect,
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

async function getData() {
  const res = await fetch("http://localhost:4004/search/list");
  return res.json();
}

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [search, setSearch] = useState<ListSearchTypes[]>([]);
  const [saveSearch, setSaveSearch] = useState<SaveSearchTypes[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setSearch(data);
    };

    fetchData();
  }, []);

  return (
    <SearchContext.Provider value={{ search, setSearch, saveSearch, setSaveSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
