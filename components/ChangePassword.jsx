import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";

import "../styles/ChangePassword.scss";
import cPass from "../assets/passwordChange.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import password from "../schemas/password";
import AppTextBox from "./AppTextBox";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { setChangePass, setToken } from "../services/slice/authSlice";
import { usePasswordChangeMutation } from "../services/store/request";
import { onKeyEnter } from "../services/functions/keyUpFunctions";
import { objectError } from "../services/functions/errorResponse";
import { useSnackbar } from "notistack";
import { loginUser } from "../services/functions/loginServices";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const [changePassword, { isLoading }] = usePasswordChangeMutation();

  const {
    control,
    watch,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(password),
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await changePassword(data).unwrap();
      loginUser(userData);
      enqueueSnackbar(res?.message, { variant: "success" });
      navigate("/");
    } catch (error) {
      objectError(error, setError, enqueueSnackbar);
    }
  };

  return (
    <Paper elevation={0} className="changePassPaper">
      <img src={cPass} />
      <Typography className="passwordChange">CHANGE PASSWORD</Typography>
      <form onSubmit={handleSubmit(onSubmit)} className="formChangePass">
        <AppTextBox
          className={"textChangePass"}
          control={control}
          name="old_password"
          label="Old Password"
          type={"password"}
          secure={watch("old_password")}
          helperText={errors?.old_password?.message}
          error={Boolean(errors?.old_password)}
          onKeyDown={onKeyEnter}
        />
        <AppTextBox
          className={"textChangePass"}
          control={control}
          name="new_password"
          label="New Password"
          type={"password"}
          secure={watch("new_password")}
          helperText={errors?.new_password?.message}
          error={Boolean(errors?.new_password)}
          onKeyDown={onKeyEnter}
        />
        <AppTextBox
          className={"textChangePass"}
          control={control}
          name="confirm_password"
          label="Confirm Password"
          type={"password"}
          secure={watch("confirm_password")}
          helperText={errors?.confirm_password?.message}
          error={Boolean(errors?.confirm_password)}
          onKeyDown={onKeyEnter}
        />

        <Stack
          flexDirection={"row"}
          gap={1.5}
          display={"flex"}
          alignSelf={"flex-end"}
          justifySelf={"flex-end"}
        >
          <LoadingButton
            className="changePassButton"
            variant="outlined"
            type="submit"
            color="success"
            loading={isLoading}
            disabled={
              !watch("old_password") ||
              !watch("new_password") ||
              !watch("confirm_password")
            }
          >
            Update
          </LoadingButton>
          <LoadingButton
            variant="outlined"
            color="error"
            className="changePassButton"
            onClick={() => {
              dispatch(setChangePass(false));
              dispatch(setToken(null));
            }}
          >
            Cancel
          </LoadingButton>
        </Stack>
      </form>
    </Paper>
  );
};

export default ChangePassword;
