import { Box, Card, Dialog, Stack, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";

import "../styles/Login.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchemaLogin from "../schemas/login";
import AppTextBox from "../components/AppTextBox";
import { useLoginMutation } from "../services/store/request";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setChangePass,
  setToken,
  setUserData,
} from "../services/slice/authSlice";
import misLogo from "../assets/misLogo.png";
import { onKeyEnter } from "../services/functions/keyUpFunctions";
import { loginUser } from "../services/functions/loginServices";
import { objectError } from "../services/functions/errorResponse";
import ChangePassword from "../components/ChangePassword";
import { useSnackbar } from "notistack";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();

  const changePass = useSelector((state) => state.auth.changePass);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const {
    control,
    watch,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchemaLogin),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const submitHandler = async (submitData) => {
    try {
      const res = await login(submitData).unwrap();
      dispatch(setToken(res.token));
      dispatch(setUserData(res));
      if (res?.username === submitData.password) {
        dispatch(setChangePass(true));
      } else {
        loginUser(res);
        navigate("/dashboard");
      }
    } catch (error) {
      objectError(error, setError, enqueueSnackbar);
    }
  };

  return (
    <Box className="loginBox">
      <form onSubmit={handleSubmit(submitHandler)}>
        <Card className="cardLogin">
          <Typography className="typoLogin" color="primary.dark">
            LOGIN
          </Typography>
          <AppTextBox
            className={"loginText"}
            control={control}
            name="username"
            label="Username"
            variant="outlined"
            helperText={errors?.username?.message}
            error={Boolean(errors?.username)}
            onKeyDown={onKeyEnter}
          />
          <AppTextBox
            className={"loginText"}
            control={control}
            name="password"
            label="Password"
            variant="outlined"
            type={"password"}
            secure={watch("password")}
            helperText={errors?.password?.message}
            error={Boolean(errors?.password)}
          />
          <LoadingButton
            className="loginButton"
            variant="contained"
            color="secondary"
            type="submit"
            loading={isLoading}
          >
            SUBMIT
          </LoadingButton>
          <Stack display={"flex"} alignItems={"center"}>
            <img
              src={misLogo}
              alt="misLogo"
              className="misLogo"
              draggable="false"
            />
            <Typography className="misRights" color="primary.dark">
              Powered By MIS All rights reserved
            </Typography>
            <Typography className="misRights" color="primary.dark">
              Copyrights &copy; 2021
            </Typography>
          </Stack>
        </Card>
      </form>
      <Dialog open={changePass} onClose={() => dispatch(setChangePass(false))}>
        <ChangePassword />
      </Dialog>
    </Box>
  );
};

export default Login;
