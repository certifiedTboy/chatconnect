import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser } from "../../lib/userApi";

const initialState = {
  user: getCurrentUser() || null,
  isLoading: false,
  isAuth: false,
  error: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginPending: (state) => {
      state.isLoading = true;
      state.isAuth = false;
      state.error = "";
    },
    loginSuccess: (state) => {
      state.user = getCurrentUser() || null;
      state.isLoading = false;
      state.isAuth = true;
      state.error = "";
    },
    loginFail: (state, { payload }) => {
      state.isLoading = false;
      state.isAuth = false;
      state.error = payload;
    },
    onLogout: (state) => {
      state.user = null;
      state.isLoading = false;
      state.isAuth = false;
      state.error = "";
    },
  },
});

const { reducer, actions } = loginSlice;

export const { loginPending, loginSuccess, loginFail, onLogout } = actions;

export default reducer;
