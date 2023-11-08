import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import React from "react";

const AppMenu = ({ child, anchorEl = null, handleClose }) => {
  const open = Boolean(anchorEl);

  return (
    <Menu
      elevation={0}
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      {child}
    </Menu>
  );
};

export default AppMenu;
