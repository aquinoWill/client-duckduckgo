'use client'

import { FormEvent, useEffect, useState, useMemo, ChangeEvent } from "react";
import { Stack, TextField, Box, List, ListItem, ListItemText } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useSearchApi, useSaveSearch, useReadSearch } from "@/actions/useSearchApi";
import { useSearch } from "@/context/SearchContext";

type SaveSearchTypes = {
  query: string;
};

export function Search() {
  const [query, setQuery] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [occurrences, setOccurrences] = useState(0);
  const [searchResults, setSearchResults] = useState<SaveSearchTypes[]>([]);

  const { saveSearch, setSaveSearch } = useSearch();
  const { fetchSearchData } = useSearchApi();
  const { fetchSaveSearchData } = useSaveSearch();
  const { fetchreadSearchData } = useReadSearch();

  useEffect(() => {
    const fetchData = async () => {
      const { list } = await fetchreadSearchData();
      setSaveSearch(list);
    };
    fetchData();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const queryValue = formData.get("q");
    if (queryValue !== null) {
      setSaveSearch([...saveSearch, { query: queryValue } as SaveSearchTypes]);
      setQuery(queryValue as string);
    }

    await fetchSearchData(formData);
    await fetchSaveSearchData(formData);
  };

  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    setSearchResults(saveSearch);
    setOccurrences(saveSearch.filter(item => item.query.includes(term)).length);
  };

  const highlightedText = (text: string) => {
    if (!searchTerm) return text;
    const regex = new RegExp(searchTerm, 'gi');
    return text.replace(regex, match => `${match}`);
  };

  const filteredResults = useMemo(() => {
    if (!searchTerm) {
      setOccurrences(0)
      return [];
    };

    return searchResults.filter(item => item.query.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm, searchResults])

  useMemo(() => {
    const lastElement = saveSearch[saveSearch.length - 1];
    setQuery(lastElement?.query);
  }, [saveSearch]);

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Stack direction="row">
          <Tooltip title="Search" enterDelay={1000}>
            <div>
              <IconButton
                type="button"
                aria-label="search"
                sx={{
                  display: { xs: 'inline', md: 'none' },
                }}
              >
                <SearchIcon />
              </IconButton>
            </div>
          </Tooltip>
          <TextField
            fullWidth
            name="q"
            label="Search"
            variant="outlined"
            size="small"
            value={query ? query : ''}
            sx={{ display: { md: 'inline-block' }, mr: 1 }}
            slotProps={{
              input: {
                endAdornment: (
                  <div>
                    <IconButton type="button" aria-label="search" size="small">
                      <SearchIcon />
                    </IconButton>
                    {occurrences > 0 && (
                      <Box>
                        <span>({occurrences} match)</span>
                      </Box>
                    )}
                  </div>
                ),
                sx: { pr: 0.5 },
              }
            }}
            onChange={(event) => {
              setQuery(event.target.value);
              handleSearch(event);
            }}
          />
        </Stack>
      </form>
      <Box>
        {filteredResults.length > 0 && (
          <List>
            {filteredResults.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  secondary={highlightedText(item.query)}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
}

export default Search;
