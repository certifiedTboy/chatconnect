import {
  loginFail,
  loginPending,
  loginSuccess,
  activeUser,
} from "./loginSlice";
import { userLogin } from "../../lib/authApi";

const API_URL = "http://localhost:3001";

export const newUserLogin = (frmDt) => async (dispatch) => {
  try {
    dispatch(loginPending());

    const response = await userLogin(frmDt);

    if (response.status === "failed") {
      dispatch(loginFail({ error: "something went wrong" }));
    }

    if (response.error) {
      dispatch(loginFail({ error: response.error }));
    } else {
      dispatch(loginSuccess());
    }
  } catch (error) {
    dispatch(loginFail({ error: "Server Error" }));
  }
};

export const createConnection = (user) => async (dispatch) => {
  await dispatch(activeUser(user));
};
