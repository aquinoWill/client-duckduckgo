'use client'

import React from 'react';
import MuiAvatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import { MenuContent } from './MenuContent';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

const Avatar = styled(MuiAvatar)(({ theme }) => ({
  width: 45,
  height: 45,
  margin: theme.spacing(0.8, 2),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.divider}`,
}));

export function SideMenu() {
  return (
    <Drawer
      variant="permanent"
    >
      <Avatar alt="Sitemark web">
        <DevicesRoundedIcon sx={{ fontSize: '1rem' }} />
      </Avatar>
      <MenuContent />
    </Drawer>
  );
}

export default SideMenu;
