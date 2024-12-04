import { useSearch } from "@/context/SearchContext";

type ListSearchTypes = {
  url: string;
  title: string;
};

type ReadSearchTypes = {
  list: Array<{
    query: string;
  }>
};

export const useSearchApi = () => {
  const { setSearch } = useSearch();

  const fetchSearchData = async (formData: FormData | string) => {
    const query = typeof formData === "string" ? formData : formData.get("q");
    const res = await fetch(`http://localhost:4004/search/list?q=${query}`);

    const data = res.json().then((data: ListSearchTypes[]) => {
      setSearch(data);
      return data;
    });

    return data;
  };

  return { fetchSearchData };
};


export const useSaveSearch = () => {
  const fetchSaveSearchData = async (formData: FormData) => {
    return await fetch('http://localhost:4004/search/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: formData.get("q") }),
    });
  };

  return { fetchSaveSearchData };
};

export const useReadSearch = () => {
  const fetchreadSearchData = async (): Promise<ReadSearchTypes[]> => {
    const res = await fetch('http://localhost:4004/search/read');

    const data = res?.json().then((data: ReadSearchTypes[]) => {
      return data;
    });

    return data;
  };

  return { fetchreadSearchData };
};

export default { useSearchApi, useSaveSearch, useReadSearch };
