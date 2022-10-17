import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../components/Auth/loginSlice";
import registerationReducer from "../components/Auth/userRegisterationSlice";
import profileSlice from "../components/Profile/profileSlice";
import requestSlice from "../components/Profile/requestRedux/requestSlice";

//second step in using redux toolkits {creating configure store}

const store = configureStore({
  reducer: {
    login: loginReducer,
    registeration: registerationReducer,
    profile: profileSlice,
    request: requestSlice,
  },
});

export default store;
