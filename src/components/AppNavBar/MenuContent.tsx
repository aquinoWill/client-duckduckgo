import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import { useSearchApi, fetchSaveHistorySearch } from "@/actions/useSearchApi";
import { useSearch } from "@/context/SearchContext";

type SaveSearchTypes = {
  query: string;
};

export function MenuContent() {
  const { saveHistorySearch, setSaveHistorySearch } = useSearch();
  const { fetchSearchData } = useSearchApi();
  const handleItemClick = async (item: SaveSearchTypes) => {
    setSaveHistorySearch([...saveHistorySearch, { query: item.query } as SaveSearchTypes]);
    await fetchSearchData(item.query);
    await fetchSaveHistorySearch(item.query);
  };

  return (
    <Stack
      direction="column"
      sx={{ width: "100%", justifyContent: "space-between" }}
    >
      <List dense>
        {saveHistorySearch.map((item, index) => (
          <ListItem
            disablePadding
            key={index}
            onClick={() => handleItemClick(item)}
          >
            <ListItemButton>
              <ListItemText primary={item.query} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}

export default MenuContent;
