import { Box } from "@mui/material";
import React from "react";
import notFound from "../../assets/NotFound.png";
import "../../styles/NotFound.scss";

const NotFound = () => {
  return (
    <Box className="notFoundBox">
      <img
        src={notFound}
        alt="not found"
        draggable="false"
        className="imgNotFound"
      />
    </Box>
  );
};

export default NotFound;
