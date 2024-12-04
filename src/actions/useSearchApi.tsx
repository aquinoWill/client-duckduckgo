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

  const fetchSearchData = async (formData: FormData | string): Promise<ListSearchTypes[]> => {
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
  const fetchReadSearchData = async (): Promise<ReadSearchTypes[]> => {
    const res = await fetch('http://localhost:4004/search/read');

    const data = res?.json().then((data: ReadSearchTypes[]) => {
      return data;
    });

    return data;
  };

  return { fetchReadSearchData };
};

export const useSearchList = () => {

  const fetchSearchList = async (): Promise<ListSearchTypes[]> => {
    const res = await fetch("http://localhost:4004/search/list");
    return res.json();
  }

  return { fetchSearchList }
}

export default { useSearchApi, useSaveSearch, useReadSearch, useSearchList };
