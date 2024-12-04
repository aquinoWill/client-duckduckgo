import React from 'react';
import { List, ListItem, ListItemButton, ListItemText, Stack,  } from '@mui/material';
import { useSearchApi } from "@/actions/useSearchApi";
import { useSearch } from '@/context/SearchContext';

type SaveSearchTypes = {
  query: string;
};

export function MenuContent() {
  const { saveSearch, setSaveSearch } = useSearch();
  const { fetchSearchData } = useSearchApi();
  const handleItemClick = async (item: SaveSearchTypes) => {
    await fetchSearchData(item.query);
    setSaveSearch([...saveSearch, { query: item.query } as SaveSearchTypes]);
  };

  return (
    <Stack direction='column' sx={{ width: '100%', justifyContent: 'space-between' }}>
      <List dense>
        {saveSearch.map((item, index) => (
          <ListItem disablePadding key={index} onClick={() => handleItemClick(item)}>
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
