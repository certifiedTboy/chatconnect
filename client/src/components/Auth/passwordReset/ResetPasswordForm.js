import React, { Fragment, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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

    if (email.trim().length === 0) {
      return;
    }
    await onRequestPasswordReset(userData);
  };

  return (
    <Fragment>
      <div className={classes.regheade}>
        <p>Enter email to reset password</p>
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

          <div className="form-group">
            <button className="btn btn-success" style={{ display: "inline" }}>
              Reset Password
            </button>

            <p
              style={{
                display: "inline",
                marginLeft: 11,
                fontSize: "15px",
              }}
            >
              <NavLink to={"/login"}>Go back</NavLink>
            </p>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default ResetPasswordForm;
