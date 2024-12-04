import React from 'react';
import { List, ListItem, ListItemText, Stack,  } from '@mui/material';
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
          <ListItem key={index} onClick={() => handleItemClick(item)}>
            <ListItemText primary={item.query} />
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}

export default MenuContent;
