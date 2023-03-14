import React, { Fragment, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "./RegForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Form } from "react-bootstrap";
import { newUserLogin } from "./LoginActions";
import { loginFail } from "./loginSlice";
import { getUserProfile } from "../../lib/userApi";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, user } = useSelector((state) => state.login);

  const checkIsAutenticated = async () => {
    const userProfile = await getUserProfile(user);
    if (userProfile.profile.profilePicture === "uploads/dummyimage.jpg") {
      return navigate("/profile-picture");
    } else {
      return navigate("/rooms");
    }
  };
  useEffect(() => {
    checkIsAutenticated();
  }, [user]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const loginHandler = async (event) => {
    event.preventDefault();
    const data = {
      username,
      password,
    };

    if (username.trim().length === 0 || password.trim().length === 0) {
      dispatch(loginFail({ error: "Login field can't be empty" }));
      return;
    }

    try {
      dispatch(newUserLogin(data));
    } catch (error) {
      dispatch(loginFail(error));
    }
  };

  let errorData;
  if (error) {
    errorData = (
      <div>
        <Alert variant="danger">{error.error}</Alert>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="col-10 col-lg-4 col-md-6">
        <div className={classes.formBorder}>
          <h4 className={classes.loginFormHeader}>Login Here</h4>
          {errorData}
          <form onSubmit={loginHandler}>
            <Form.Group>
              <Form.Control
                type="text"
                value={username}
                onChange={usernameHandler}
                placeholder="Enter Username"
                style={{
                  marginBottom: 10,
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="password"
                value={password}
                onChange={passwordHandler}
                placeholder="Password"
                style={{
                  marginBottom: 10,
                }}
              />
            </Form.Group>

            <button className="btn btn-success">Login</button>
            <div className={classes.formTextWrapper}>
              <NavLink className={classes.formText1} to={"/register"}>
                Sign Up
              </NavLink>
              <NavLink className={classes.formText2} to={"/password-reset"}>
                Forgot password
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginForm;
