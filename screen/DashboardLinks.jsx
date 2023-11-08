import React, { useState } from "react";
import CardLinks from "../components/CardLinks";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import { useLocation } from "react-router-dom";

import {
  Box,
  Dialog,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  Switch,
} from "@mui/material";

import "../styles/DashboardLinks.scss";

import { useLinksQuery } from "../services/store/request";
import AppMenu from "../components/AppMenu";
import { useDispatch, useSelector } from "react-redux";
import {
  resetLinkState,
  setItems,
  setOpenDrawer,
  setLinkUpdate,
} from "../services/slice/linkSlice";
import ListDrawer from "../components/ListDrawer";

import Loading from "../components/Loading";
import { setArchive } from "../services/slice/promptSlice";
import Archive from "../components/prompts/Archive";
import useParamsHook from "../services/hooks/useParamsHook";
import NotFound from "../components/errors/NotFound";

const DashboardLinks = () => {
  const dispatch = useDispatch();
  const openDrawer = useSelector((state) => state.link.openDrawer);
  const update = useSelector((state) => state.link.linkUpdate);
  const archive = useSelector((state) => state.prompt.archive);

  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const { params, onStatusChange } = useParamsHook();

  const { data: linkData, isFetching, isError, error } = useLinksQuery(params);

  const handleClose = () => {
    if (openDrawer) {
      setAnchorEl(null);
    } else {
      dispatch(resetLinkState());
      setAnchorEl(null);
    }
  };

  const options = [
    {
      label: "Update",
      icon: <DriveFileRenameOutlineOutlinedIcon />,
      disabled: false,
      function: () => {
        dispatch(setOpenDrawer(true));
        dispatch(setLinkUpdate(true));
        setAnchorEl(null);
      },
    },
    {
      label: "Archive",
      icon: <DeleteForeverOutlinedIcon />,
      function: () => {
        dispatch(setArchive(true));
        setAnchorEl(null);
      },
      disabled: false,
    },
  ];

  const optionsRestore = [
    {
      label: "Restore",
      icon: <DeleteForeverOutlinedIcon />,
      function: () => {
        dispatch(setArchive(true));
        setAnchorEl(null);
      },
      disabled: false,
    },
  ];

  return (
    <Box className={`dashboardLinks `}>
      {isFetching ? (
        options.map((item) => <Loading key={item.label} />)
      ) : isError ? (
        <></>
      ) : (
        linkData?.map((items) => (
          <CardLinks
            key={items.name}
            title={items.name}
            logo={items.logo}
            description={items.description}
            warehouse={items.image}
            link={items.url}
            auth={location?.pathname !== "/"}
            disable={params.status === "inactive"}
            menuAuth={
              <>
                <Stack position={"absolute"} direction={"row"} right={0}>
                  <IconButton
                    className="cardOptions"
                    onClick={(e) => {
                      dispatch(setItems(items));
                      setAnchorEl(e.currentTarget);
                    }}
                  >
                    <MoreVertOutlinedIcon />
                  </IconButton>
                </Stack>
              </>
            }
          />
        ))
      )}
      {isFetching ? (
        options.map((item) => <Loading key={item.label} />)
      ) : isError ? (
        params.status === "active" ? (
          <Box className="addLinks">
            <IconButton onClick={() => dispatch(setOpenDrawer(true))}>
              <AddOutlinedIcon className="addButtonIcon" />
            </IconButton>
          </Box>
        ) : (
          <NotFound status={error?.status} message={error?.data?.message} />
        )
      ) : (
        location?.pathname !== "/" &&
        params.status === "active" && (
          <Box className="addLinks">
            <IconButton onClick={() => dispatch(setOpenDrawer(true))}>
              <AddOutlinedIcon className="addButtonIcon" />
            </IconButton>
          </Box>
        )
      )}
      <ListDrawer title={update ? "Update Link" : "Create new link"} />
      <Dialog open={archive} onClose={() => dispatch(setArchive(false))}>
        <Archive title={params.status === "active" ? "Archive" : "Restore"} />
      </Dialog>
      <AppMenu
        anchorEl={anchorEl}
        handleClose={handleClose}
        child={(params.status === "active" ? options : optionsRestore).map(
          (item) => (
            <MenuItem
              key={item.label}
              onClick={item.function}
              disabled={item.disabled}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.label}</ListItemText>
            </MenuItem>
          )
        )}
      />
      {location?.pathname !== "/" && (
        <Switch
          className="archiveSwitch"
          color="info"
          defaultChecked
          onChange={(e) =>
            e.target.checked === true
              ? onStatusChange("active")
              : onStatusChange("inactive")
          }
        />
      )}
    </Box>
  );
};

export default DashboardLinks;
