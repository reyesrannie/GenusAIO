import React from "react";

import { AppBar, Box } from "@mui/material";

import logo from "../assets/logo.png";
import "../styles/Layout.scss";
import "../styles/GlobalStyles.scss";

const Layout = ({ child }) => {
  return (
    <Box className="layoutContainer">
      <AppBar className="appBar">
        <img src={logo} alt="logo" className="appBarLogo" />
      </AppBar>

      {child}
    </Box>
  );
};

export default Layout;
