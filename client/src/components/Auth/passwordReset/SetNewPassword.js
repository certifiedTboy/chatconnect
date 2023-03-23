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
      <div className={`col-10 col-lg-4 col-md-6 ${classes.formBorder}`}>
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

              <div className={classes.formTextWrapper}>
                <p>
                  <NavLink
                    onClick={onGoBack}
                    className={classes.formText1}
                    to={"/login"}
                  >
                    back to login
                  </NavLink>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default SetNewPassword;
