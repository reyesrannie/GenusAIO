import { configureStore } from "@reduxjs/toolkit";
import { jsonServerAPI } from "./request";
import authSlice from "../slice/authSlice";
import linkSlice from "../slice/linkSlice";
import promptSlice from "../slice/promptSlice";
import menuSlice from "../slice/menuSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    link: linkSlice,
    prompt: promptSlice,
    menu: menuSlice,

    [jsonServerAPI.reducerPath]: jsonServerAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jsonServerAPI.middleware),
});
