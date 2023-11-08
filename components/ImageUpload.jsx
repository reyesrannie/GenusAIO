import React, { useState } from "react";

import addImage from "../assets/addImage.png";

import { Box, ButtonBase, Typography, styled } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import "../styles/ImageInput.scss";

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  border: `1px solid`,
  borderStyle: "dashed",
  overflow: "hidden",

  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
  },

  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
  },
}));

const ImageUpload = ({ src, onClick, label, hasError, error }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Box className="withImage">
      <Typography className={`labelNames ${hasError ? "error" : ""}`}>
        {label}
      </Typography>

      {src ? (
        <ImageButton
          onClick={onClick}
          onMouseLeave={() => setHovered(false)}
          onMouseEnter={() => setHovered(true)}
        >
          <img
            src={src}
            alt="Selected Image"
            className={`custom-image ${hovered ? "blurred" : ""}`}
          />
          <CloseOutlinedIcon
            className={`custom-icon-image ${hovered ? "visible" : ""}`}
          />
        </ImageButton>
      ) : (
        <>
          <ImageButton onClick={onClick}>
            <img src={addImage} alt="Selected Image" className="addImage" />
          </ImageButton>
          {error && <Typography className="errorLabel">{error}</Typography>}
        </>
      )}
    </Box>
  );
};

export default ImageUpload;
