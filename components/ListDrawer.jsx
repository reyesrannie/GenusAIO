import React, { useEffect } from "react";
import {
  useCreateLinkMutation,
  useLinksQuery,
  useUpdateLinkMutation,
} from "../services/store/request";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchemaLinks from "../schemas/links";
import { Drawer, Stack, Typography } from "@mui/material";
import ImageUpload from "../components/ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import {
  resetLinkState,
  setForImage,
  setForLogo,
  setOpenDrawer,
} from "../services/slice/linkSlice";
import EditImage from "../assets/edit-tools.png";

import AppTextBox from "./AppTextBox";

import "../styles/ListDrawer.scss";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSnackbar } from "notistack";
import { objectError } from "../services/functions/errorResponse";
import ImageList from "./ImageList";

const ListDrawer = ({ title }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const link = useSelector((state) => state.link.items);
  const image = useSelector((state) => state.link.image);
  const logo = useSelector((state) => state.link.logo);
  const openDrawer = useSelector((state) => state.link.openDrawer);
  const update = useSelector((state) => state.link.linkUpdate);
  const [createLink, { isLoading }] = useCreateLinkMutation();
  const [updateLink, { isLoading: updating }] = useUpdateLinkMutation();
  const { isFetching } = useLinksQuery();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    reset,
    clearErrors,
  } = useForm({
    resolver: yupResolver(validationSchemaLinks),
    defaultValues: {
      name: "",
      description: "",
      image: "",
      logo: "",
      url: "",
      id: "",
    },
  });

  useEffect(() => {
    if (link) {
      Object.entries(link).forEach(([key, value]) => setValue(key, value));
    } else {
      reset();
    }
  }, [link]);

  const closeDrawer = () => {
    dispatch(setOpenDrawer(false));
    setTimeout(() => {
      dispatch(resetLinkState());
      reset();
    }, 500);
    reset();
  };

  const submitHandler = async (submitData) => {
    console.log(update);
    try {
      const res = update
        ? await updateLink(submitData).unwrap()
        : await createLink(submitData).unwrap();
      dispatch(resetLinkState());
      enqueueSnackbar(res?.message, { variant: "success" });
      console.log(res);
    } catch (error) {
      objectError(error, setError, enqueueSnackbar);
    }
  };

  return (
    <Drawer anchor={"right"} open={openDrawer} className="drawerRight">
      <Stack gap={1} alignItems={"center"}>
        <img src={EditImage} alt="editImage" className="listEditImage" />
        <Typography className="drawerListTitle">{title}</Typography>
        <form className="listDrawerForm" onSubmit={handleSubmit(submitHandler)}>
          <AppTextBox
            className="listDrawerText"
            control={control}
            name="name"
            label="Name"
            variant="outlined"
            helperText={errors?.name?.message}
            error={Boolean(errors?.name)}
          />
          <AppTextBox
            className="listDrawerText"
            control={control}
            name="url"
            label="URL"
            variant="outlined"
            helperText={errors?.url?.message}
            error={Boolean(errors?.url)}
          />
          <AppTextBox
            className="listDrawerText"
            control={control}
            name="description"
            label="Description"
            variant="outlined"
            helperText={errors?.description?.message}
            error={Boolean(errors?.description)}
            multiline
          />

          <ImageUpload
            label={"Select Image"}
            src={image?.url || link?.image}
            onClick={() => dispatch(setForImage(true))}
            hasError={Boolean(errors?.image)}
            error={errors?.image?.message}
          />
          <ImageUpload
            label={"Select Logo"}
            src={logo?.url || link?.logo}
            onClick={() => dispatch(setForLogo(true))}
            hasError={Boolean(errors?.logo)}
            error={errors?.logo?.message || ""}
          />

          <Stack gap={1} direction="row" justifyContent="end">
            <LoadingButton
              className="listDrawerButton"
              variant="outlined"
              color="info"
              type="submit"
              loading={isLoading || isFetching || updating}
            >
              {update ? "Update" : "Add"}
            </LoadingButton>

            <LoadingButton
              className="listDrawerButton"
              variant="outlined"
              color="error"
              onClick={closeDrawer}
            >
              Cancel
            </LoadingButton>
          </Stack>
        </form>
      </Stack>

      <ImageList />
    </Drawer>
  );
};

export default ListDrawer;
