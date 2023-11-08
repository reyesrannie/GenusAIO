import { createSlice } from "@reduxjs/toolkit";
import { decodeUser } from "../../utilities/saveUser";

const userData = decodeUser();

const initialState = {
  token: localStorage.getItem("AIO_token"),
  userData: userData,
  changePass: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setChangePass: (state, action) => {
      state.changePass = action.payload;
    },
  },
});

export const { setToken, setUserData, setChangePass } = authSlice.actions;

export default authSlice.reducer;
