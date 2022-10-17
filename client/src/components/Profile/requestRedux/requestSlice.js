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
    requestSuccess: (state) => {
      state.requestLoading = false;
      state.requestSuccess = true;
      state.requestFailed = false;
    },
    requestPending: (state) => {
      state.requestLoading = true;
      state.requestSuccess = false;
      state.requestFailed = false;
    },
    requestFailed: (state) => {
      state.requestLoading = false;
      state.requestSuccess = false;
      state.requestFailed = true;
    },
  },
});

const { reducer, actions } = requestSlice;

export const { requestPending, requestSuccess, requestFailed } = actions;

export default reducer;
