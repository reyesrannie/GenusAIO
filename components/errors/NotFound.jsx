import React from "react";
import notFound from "../../assets/NotFound.png";
import "../../styles/NotFound.scss";
import { Box, Typography } from "@mui/material";

const NotFound = ({ status, message }) => {
  return (
    <Box className="notFoundContainer">
      <img
        src={notFound}
        alt="not found"
        draggable="false"
        className="imgNotFound"
      />

      <Typography className="notFoundMessage">
        <Typography className="statusCode">{status}</Typography>

        <Typography className="message">{message}</Typography>
      </Typography>
    </Box>
  );
};

export default NotFound;
