import React, { useState } from "react";

import {
  AppBar,
  Box,
  Dialog,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from "@mui/material";

import logo from "../assets/logo.png";
import "../styles/Layout.scss";
import "../styles/GlobalStyles.scss";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import { useNavigate } from "react-router-dom";
import AppMenu from "./AppMenu";
import { useLogoutMutation } from "../services/store/request";
import { useDispatch, useSelector } from "react-redux";
import { setChangePass } from "../services/slice/authSlice";
import ChangePassword from "./ChangePassword";
import MenuDrawer from "./MenuDrawer";
import { setDrawer } from "../services/slice/menuSlice";

const ProtectedLayout = ({ child }) => {
  const dispatch = useDispatch();
  const drawer = useSelector((state) => state.menu.drawer);
  const changePass = useSelector((state) => state.auth.changePass);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = async () => {
    try {
      const res = await logout().unwrap();
      localStorage.removeItem("AIO");
      localStorage.removeItem("AIO_token");
      navigate("/");
    } catch (error) {
      localStorage.removeItem("AIO");
      localStorage.removeItem("AIO_token");
      navigate("/");
    }
  };

  const items = [
    {
      label: "Password change",
      icon: <VpnKeyOutlinedIcon />,
      function: () => {
        dispatch(setChangePass(true));
        setAnchorEl(null);
      },
    },
    {
      label: "Logout",
      icon: <ExitToAppOutlinedIcon />,
      function: onLogout,
    },
  ];

  return (
    <Box className="layoutContainer">
      <AppBar className="appBar">
        <Box className="menuBarBox">
          <IconButton
            onClick={() =>
              drawer ? dispatch(setDrawer(false)) : dispatch(setDrawer(true))
            }
          >
            <MenuOutlinedIcon />
          </IconButton>
          <Box>
            <img src={logo} alt="logo" className="appBarLogo" />
          </Box>
        </Box>
        <Box>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <AccountCircleOutlinedIcon />
          </IconButton>
        </Box>
      </AppBar>
      <MenuDrawer />
      {child}
      <AppMenu
        anchorEl={anchorEl}
        handleClose={handleClose}
        child={items.map((item) => (
          <MenuItem key={item.label} onClick={item.function}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.label}</ListItemText>
          </MenuItem>
        ))}
      />
      <Dialog open={changePass} onClose={() => dispatch(setChangePass(false))}>
        <ChangePassword />
      </Dialog>
    </Box>
  );
};

export default ProtectedLayout;
