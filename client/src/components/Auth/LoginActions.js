import { loginFail, loginPending, loginSuccess } from "./loginSlice";
import { userLogin } from "../../lib/authApi";

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
