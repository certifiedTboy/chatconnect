import {
  registerationFail,
  registerationPending,
  registerationSuccess,
} from "./userRegisterationSlice";
import { userRegisteration } from "../../lib/authApi";

export const newUserRegisteration = (frmDt) => async (dispatch) => {
  try {
    dispatch(registerationPending());

    const result = await userRegisteration(frmDt);
    result.message === "success"
      ? dispatch(registerationSuccess(result.message))
      : dispatch(registerationFail(result.message));
  } catch (error) {
    dispatch(registerationFail(error.message));
  }
};
