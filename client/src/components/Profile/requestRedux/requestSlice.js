import { createSlice } from "@reduxjs/toolkit";
import { sendRequest } from "../../../lib/requestApi";

const initialState = {
  requestLoading: false,
  requestSucess: false,
  requestFailed: false,
};

const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    successRequest: (state) => {
      state.requestLoading = false;
      state.requestSuccess = true;
      state.requestFailed = false;
    },
    pendingRequest: (state) => {
      state.requestLoading = true;
      state.requestSuccess = false;
      state.requestFailed = false;
    },
    failedRequest: (state) => {
      state.requestLoading = false;
      state.requestSuccess = false;
      state.requestFailed = true;
    },
  },
});

const { reducer, actions } = requestSlice;

export const { successRequest, pendingRequest, failedRequest } = actions;

export default reducer;
