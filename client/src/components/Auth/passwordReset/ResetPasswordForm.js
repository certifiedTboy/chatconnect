import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "../RegForm.module.css";
import { Alert, Form } from "react-bootstrap";

const ResetPasswordForm = ({ onRequestPasswordReset, errorMessage }) => {
  const [email, setEmail] = useState("");
  //   const [errorMessage, setErrorMessage] = useState("");

  const onChangeEmailInput = (event) => {
    setEmail(event.target.value);
  };
  const passwordResetRequestHandler = async (event) => {
    event.preventDefault();

    const userData = {
      email,
    };
    await onRequestPasswordReset(userData);
  };

  return (
    <Fragment>
      <div className="col-10 col-lg-4 col-md-6">
        <h4 className={classes.loginFormHeader}>
          Enter email to reset password
        </h4>
        {errorMessage.trim().length > 0 && (
          <div>
            <Alert variant="danger">{errorMessage}</Alert>
          </div>
        )}
        <form onSubmit={passwordResetRequestHandler}>
          <Form.Group>
            <Form.Control
              type="text"
              value={email}
              onChange={onChangeEmailInput}
              placeholder="Enter email"
              style={{
                marginBottom: 10,
              }}
            />
          </Form.Group>

          <button className="btn btn-success">Reset Password</button>
          <div className={classes.formTextWrapper}>
            <p>
              <NavLink className={classes.formText1} to={"/login"}>
                back to login
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default ResetPasswordForm;
