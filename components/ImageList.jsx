import React from "react";
import {
  Box,
  Button,
  ImageListItem,
  ImageListItemBar,
  ImageList as Images,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import {
  useImagesQuery,
  useUploadImageMutation,
} from "../services/store/request";

import "../styles/ImageList.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchemaImage from "../schemas/image";
import { useDispatch, useSelector } from "react-redux";
import { setForImage, setForLogo, setItems } from "../services/slice/linkSlice";
import clickIcon from "../assets/click-here.png";
import Loading from "./Loading";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSnackbar } from "notistack";

const ImageList = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const link = useSelector((state) => state.link.items);
  const forLogo = useSelector((state) => state.link.forLogo);
  const forImage = useSelector((state) => state.link.forImage);

  const { data = [], isFetching, refetch } = useImagesQuery();
  const [uploadImage, { isLoading }] = useUploadImageMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchemaImage),
    defaultValues: {
      name: "",
      image: null,
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setValue("image", file);
    setValue("name", file.name);
    handleSubmit(submitHandler)();
  };

  const selectImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".jpg, .jpeg, .png";
    input.onchange = handleImageChange;
    input.click();
  };

  const submitHandler = async (data) => {
    const upload = new FormData();
    upload.append("image", data.image);
    upload.append("name", data.name);

    try {
      const res = await uploadImage(upload).unwrap();
      await refetch();
      enqueueSnackbar(res.message, { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error?.data?.message, { variant: "error" });
    }
  };

  const handleClose = () => {
    dispatch(setForImage(false));
    dispatch(setForLogo(false));
  };

  return (
    <Modal
      open={forImage || forLogo}
      onClose={handleClose}
      className="imageModal"
    >
      <Box className="imageBox">
        <img
          src={clickIcon}
          alt="click-here"
          className="selectImageicon"
          draggable={"false"}
        />
        <Typography className="imageListTitle">Select a photo</Typography>
        <Typography className="imageListTitle">or</Typography>

        <LoadingButton
          variant="contained"
          color="info"
          className="imageButton"
          onClick={selectImage}
          loading={isLoading || isFetching}
        >
          Upload Photo
        </LoadingButton>
        {isFetching || isLoading ? (
          <Stack direction={"row"}>
            <Loading />
            <Loading />
          </Stack>
        ) : (
          <Images className="imageList" cols={3} gap={8}>
            {data?.map((images) => (
              <ImageListItem key={images.asset_id} className="imageItems">
                <img
                  draggable="false"
                  srcSet={images.secure_url}
                  src={images.secure_url}
                  alt={images.public_id}
                  loading="lazy"
                  onClick={() => {
                    forImage
                      ? dispatch(setItems({ ...link, image: images.url }))
                      : dispatch(setItems({ ...link, logo: images.url }));
                    handleClose();
                  }}
                />
                <ImageListItemBar subtitle={images.public_id} />
              </ImageListItem>
            ))}
          </Images>
        )}
      </Box>
    </Modal>
  );
};

export default ImageList;
