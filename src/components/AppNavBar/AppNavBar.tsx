'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MuiToolbar from '@mui/material/Toolbar';
import { tabsClasses } from '@mui/material/Tabs';
import SideMenu from './SideMenu';

const Toolbar = styled(MuiToolbar)({
  width: '100%',
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'center',
  gap: '12px',
  flexShrink: 0,
  [`& ${tabsClasses.flexContainer}`]: {
    gap: '8px',
    p: '8px',
    pb: 0,
  },
});

export function AppNavBar({ children }: { children: React.ReactNode }) {
  return (
    <Toolbar variant="regular">
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          flexGrow: 1,
          width: '100%',
          gap: 1,
        }}
      >
        <Box>
          <SideMenu />
        </Box>
        <Box>
          { children }
        </Box>
      </Stack>
    </Toolbar>
  );
}

export default AppNavBar;
