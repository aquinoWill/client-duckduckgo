"use client";

import React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import { MenuContent } from "./MenuContent";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

export function SideMenu() {
  return (
    <Drawer variant="permanent">
      <MenuContent />
    </Drawer>
  );
}

export default SideMenu;
