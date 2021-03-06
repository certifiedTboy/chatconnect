import React, { Fragment, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "./RegForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Form } from "react-bootstrap";
import { newUserLogin } from "./LoginActions";
import { loginFail } from "./loginSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isAuth, error, user } = useSelector(
    (state) => state.login
  );
  const { status } = useSelector((state) => state.registeration);

  const checkIsAutenticated = () => {
    if (user) {
      navigate("/rooms");
    }
  };
  useEffect(() => {
    checkIsAutenticated();
  }, [checkIsAutenticated, user]);

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
      return;
    }
    try {
      dispatch(newUserLogin(data));
    } catch (error) {
      dispatch(loginFail(error));
    }
  };

  return (
    <Fragment>
      <div className="col-12 col-lg-6">
        <div className="container">
          <div className="row">
            <div className={classes.regheade}>
              <h4>Login Here</h4>
              <p>Login as a User</p>

              {error && <Alert variant="danger">{error}</Alert>}
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
                <div className="form-group">
                  <button
                    className="btn btn-success"
                    style={{ display: "inline" }}
                  >
                    Login
                  </button>
                  <p
                    className="log"
                    style={{ display: "inline", marginLeft: 11 }}
                  >
                    Dont' have an Account ?{" "}
                    <NavLink to={"/register"}>Sign Up</NavLink>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginForm;
