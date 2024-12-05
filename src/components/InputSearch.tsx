"use client";

import { FormEvent, useState, useMemo, ChangeEvent, useEffect } from "react";
import {
  Box,
  List,
  Stack,
  Tooltip,
  ListItem,
  TextField,
  IconButton,
  ListItemText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchApi, fetchSaveHistorySearch } from "@/actions/useSearchApi";
import { useSearch } from "@/context/SearchContext";

type SaveSearchTypes = {
  query: string;
};

export function InputSearch() {
  const [query, setQuery] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [occurrences, setOccurrences] = useState(0);
  const [searchResults, setSearchResults] = useState<SaveSearchTypes[]>([]);

  const { saveHistorySearch, setSaveHistorySearch } = useSearch();
  const { fetchSearchData } = useSearchApi();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const queryValue = formData.get("q");
    if (queryValue !== null) {
      setSaveHistorySearch([...saveHistorySearch, { query: queryValue } as SaveSearchTypes]);
      setQuery(queryValue as string);
    }

    await fetchSearchData(formData);
    await fetchSaveHistorySearch(queryValue as string);
  };

  const handleSearchChange = async (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    setSearchResults(saveHistorySearch);
    setOccurrences(
      saveHistorySearch.filter((item) => item.query.includes(term)).length
    );
  };

  const matchText = (text: string) => {
    if (!searchTerm) return text;
    const regex = new RegExp(searchTerm, "gi");
    return text.replace(regex, (match) => `${match}`);
  };

  const filteredResults = useMemo(() => {
    if (!searchTerm) {
      setOccurrences(0);
      return [];
    }

    return searchResults.filter((item) =>
      item.query.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, searchResults]);

  useEffect(() => {
    const lastElement = saveHistorySearch[saveHistorySearch.length - 1];
    setQuery(lastElement?.query);
  }, [saveHistorySearch]);

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
                  display: { xs: "inline", md: "none" },
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
            value={query ? query : ""}
            sx={{ display: { md: "inline-block" }, mr: 1 }}
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
              },
            }}
            onChange={(event) => {
              setQuery(event.target.value);
              handleSearchChange(event);
            }}
          />
        </Stack>
      </form>
      <Box>
        {filteredResults.length > 0 && (
          <List>
            {filteredResults.map((item, index) => (
              <ListItem key={index}>
                <ListItemText secondary={matchText(item.query)} />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
}

export default InputSearch;
