import { Skeleton, Stack } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <Stack gap={1} display={"flex"} flexDirection={"row"} margin={2}>
      <Stack gap={1}>
        <Stack gap={1} display={"flex"} flexDirection={"row"}>
          <Skeleton variant="circular" width={50} height={50} />
          <Skeleton variant="circular" width={50} height={50} />
          <Skeleton variant="circular" width={50} height={50} />
        </Stack>
        <Skeleton variant="rounded" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />

        <Skeleton variant="rounded" width={210} height={60} />
      </Stack>
      <Skeleton variant="rectangular" width={100} height={255} />
    </Stack>
  );
};

export default Loading;
