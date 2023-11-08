import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import archiveIcon from "../../assets/archive.png";

import "../../styles/ArchivePrompt.scss";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import { resetPrompt, setArchive } from "../../services/slice/promptSlice";
import { resetLinkState } from "../../services/slice/linkSlice";
import { useArchiveLinkMutation } from "../../services/store/request";
import { useSnackbar } from "notistack";
const Archive = ({ title }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const link = useSelector((state) => state.link.items);
  const [archiveLink, { isLoading }] = useArchiveLinkMutation();

  const handleArchive = async () => {
    try {
      const res = await archiveLink(link).unwrap();
      enqueueSnackbar(res.message, { variant: "success" });
      dispatch(resetLinkState());
      dispatch(resetPrompt());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper className="archivePrompt">
      <img src={archiveIcon} alt="archive" className="archiveIconPrompt" />
      <Typography className="archiveTitle">{title}</Typography>
      <Typography className="archiveDescription">
        Are you trying to {title === "Archive" ? "archive" : "restore"} this
        data?
      </Typography>
      <Box className="archiveBoxDetails">
        <img src={link?.logo} alt={link?.name} className="archiveLogo" />
        <Typography className="archiveItem">{link?.name}</Typography>
      </Box>
      <Box className="actionArchiveBox">
        <LoadingButton
          variant="outlined"
          color="secondary"
          className="archiveButton"
          onClick={() => handleArchive()}
          loading={isLoading}
          disabled={isLoading}
        >
          {title}
        </LoadingButton>
        <Button
          variant="outlined"
          color="error"
          className="archiveButton"
          onClick={() => {
            dispatch(setArchive(false));
            dispatch(resetLinkState());
          }}
        >
          Cancel
        </Button>
      </Box>
    </Paper>
  );
};

export default Archive;
