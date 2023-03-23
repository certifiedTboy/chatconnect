import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser } from "../../lib/userApi";

const initialState = {
  user: getCurrentUser() || null,
  isLoading: false,
  isAuth: false,
  error: "",
  userOnline: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginPending: (state) => {
      state.isLoading = true;
      state.isAuth = false;
      state.error = null;
      state.userOnline = null;
    },
    loginSuccess: (state) => {
      state.user = getCurrentUser() || null;
      state.isLoading = false;
      state.isAuth = true;
      state.error = null;
      state.userOnline = true;
    },
    loginFail: (state, { payload }) => {
      state.isLoading = false;
      state.isAuth = false;
      state.error = payload;
      state.userOnline = null;
    },
    onLogout: (state) => {
      state.user = null;
      state.isLoading = false;
      state.isAuth = false;
      state.error = null;
      state.userOnline = null;
    },
    activeUser: (state, { payload }) => {
      state.userOnline = true;
    },
  },
});

const { reducer, actions } = loginSlice;

export const { loginPending, loginSuccess, loginFail, onLogout, activeUser } =
  actions;

export default reducer;
