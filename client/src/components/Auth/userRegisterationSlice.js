import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser } from "../../lib/userApi";

const initialState = {
  // user: getCurrentUser() || null,
  isLoading: false,
  status: "",
  errorMessage: "",
};

const useRegisterationSlice = createSlice({
  name: "userRegisteration",
  initialState,
  reducers: {
    registerationPending: (state) => {
      state.isLoading = true;
    },
    registerationSuccess: (state) => {
      // state.user = getCurrentUser() || null;
      state.isLoading = false;
      state.status = "Success";
      state.errorMessage = "";
    },
    registerationFail: (state, { payload }) => {
      state.isLoading = false;
      state.status = "error";
      state.errorMessage = payload;
    },
  },
});

const { reducer, actions } = useRegisterationSlice;

export const { registerationPending, registerationSuccess, registerationFail } =
  actions;

export default reducer;
