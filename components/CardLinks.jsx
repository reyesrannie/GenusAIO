import React from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import "../styles/CardLinks.scss";

const CardLinks = ({
  logo,
  title,
  description,
  warehouse,
  link,
  auth,
  menuAuth,
  disable,
}) => {
  const routeTo = () => {
    window.location.href = link;
  };

  return (
    <Card className={`cardLinks ${disable ? "disabled" : ""}`}>
      <Box className="cardDetails">
        <CardContent className="cardContentContainer">
          <CardMedia
            component="img"
            image={logo}
            alt="logo"
            className={`cardMedia ${disable ? "disabled" : ""}`}
            draggable={"false"}
          />
          <Box className="cardDrescription">
            <Typography fontWeight={"bold"} fontSize="1.3rem">
              {title}
            </Typography>
            <Typography margin={0} fontSize={".78rem"}>
              {description}
            </Typography>
          </Box>
        </CardContent>
        <Button
          color="info"
          variant="contained"
          className="btnCardLink"
          onClick={routeTo}
          disabled={disable}
        >
          Sign In
        </Button>
      </Box>
      <Box className={auth ? "imgBox-auth" : "imgBox"}>
        {auth && menuAuth}
        <CardMedia
          component="img"
          image={warehouse}
          alt="logo"
          className={"imgDetails"}
          draggable="false"
        />
      </Box>
    </Card>
  );
};

export default CardLinks;
