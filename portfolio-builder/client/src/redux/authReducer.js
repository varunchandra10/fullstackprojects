import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: JSON.parse(localStorage.getItem("Profile")) || null,
  },

  reducers: {
    AuthSuccess: (state, action) => {
      localStorage.setItem("Profile", JSON.stringify(action.payload));
      state.data = action.payload;
    },
    Logout: (state) => {
      localStorage.clear();
      state.data = null;
    },
  },
});

export default authSlice.reducer;

export const { AuthSuccess, Logout } = authSlice.actions;
