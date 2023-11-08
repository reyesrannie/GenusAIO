import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: null,
  forImage: false,
  forLogo: false,
  linkUpdate: false,
  openDrawer: false,
  itemSettings: null,
};

const linkSlice = createSlice({
  name: "link",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setForImage: (state, action) => {
      state.forImage = action.payload;
    },
    setForLogo: (state, action) => {
      state.forLogo = action.payload;
    },
    setLinkUpdate: (state, action) => {
      state.linkUpdate = action.payload;
    },
    setOpenDrawer: (state, action) => {
      state.openDrawer = action.payload;
    },

    resetLinkState: () => {
      return initialState;
    },
  },
});

export const {
  setItems,
  setForImage,
  setForLogo,
  setLinkUpdate,
  setOpenDrawer,
  resetLinkState,
} = linkSlice.actions;

export default linkSlice.reducer;
