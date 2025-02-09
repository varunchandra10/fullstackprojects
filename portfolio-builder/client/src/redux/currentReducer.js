import { createSlice } from "@reduxjs/toolkit";

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: null,
  reducers: {
    fetchCurrentUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { fetchCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
