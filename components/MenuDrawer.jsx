import {
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import React from "react";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";

import "../styles/MenuDrawer.scss";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const MenuDrawer = () => {
  const openDrawer = useSelector((state) => state.menu.drawer);
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    {
      desc: "Dashboard",
      icon: <DashboardOutlinedIcon />,
      path: "/dashboard",
      children: [],
    },
    {
      desc: "Masterlist",
      icon: <ListAltOutlinedIcon />,
      path: "/masterlist",
      children: [],
    },
  ];

  return (
    <Drawer
      variant="permanent"
      className={`menuDrawer ${openDrawer === true ? "open" : ""}`}
    >
      <Toolbar />

      <List className="menuList">
        {menu.map((menus) => (
          <ListItemButton
            className={location.pathname === menus.path ? "selectedList" : ""}
            key={menus.desc}
            onClick={() => {
              navigate(menus.path);
            }}
          >
            <ListItemIcon>{menus.icon}</ListItemIcon>
            {openDrawer && (
              <ListItemText className="listText" primary={menus.desc} />
            )}
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default MenuDrawer;
