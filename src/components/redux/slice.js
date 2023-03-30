import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
};

export const dataslice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { addUser } = dataslice.actions;

export default dataslice.reducer;
