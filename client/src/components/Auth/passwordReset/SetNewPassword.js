import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "../RegForm.module.css";
import { Alert, Form } from "react-bootstrap";

const SetNewPassword = ({
  errorMessage,
  validMessage,
  onSetNewPassword,
  token,
  onGoBack,
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");

  const newPasswordInputHandler = (event) => {
    setNewPassword(event.target.value);
  };

  const confirmNewPasswordInputHandler = (event) => {
    setNewConfirmPassword(event.target.value);
  };

  const setNewPasswordHandler = async (event) => {
    event.preventDefault();

    const passwordData = {
      newPassword,
      newConfirmPassword,
      token,
    };

    if (
      newPassword.trim().length === 0 ||
      newConfirmPassword.trim().length === 0
    ) {
      return;
    }

    await onSetNewPassword(passwordData);
  };

  return (
    <Fragment>
      <div className={classes.regheade}>
        {validMessage.length > 0 && (
          <div>
            <Alert variant="info">{validMessage}</Alert>
          </div>
        )}

        {errorMessage.length > 0 && (
          <div>
            <Alert variant="danger">{errorMessage}</Alert>
          </div>
        )}

        <form onSubmit={setNewPasswordHandler}>
          <Form.Group>
            <Form.Control
              type="password"
              value={newPassword}
              onChange={newPasswordInputHandler}
              placeholder="Enter new password"
              style={{
                marginBottom: 10,
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="password"
              value={newConfirmPassword}
              onChange={confirmNewPasswordInputHandler}
              placeholder="Re-enter password"
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
              <NavLink onClick={onGoBack} to={"/login"}>
                Go back
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default SetNewPassword;
