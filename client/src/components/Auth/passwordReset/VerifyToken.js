import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
// import classes from "../RegForm.module.css";
import OtpField from "react-otp-field";
import classes from "./verifytoken.module.css";
import { Alert, Form } from "react-bootstrap";

const VerifyToken = ({
  errorMessage,
  validMessage,
  onVerifyPasswordToken,
  onGoBack,
}) => {
  const [token, setToken] = useState("");

  const verifyPasswordTokenHandler = async () => {
    const tokenData = {
      token,
    };

    if (token.trim().length === 0) {
      return;
    }

    await onVerifyPasswordToken(tokenData);
  };

  if (token.trim().length === 6) {
    verifyPasswordTokenHandler();
  }

  return (
    <Fragment>
      <div>
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

        <Form>
          <OtpField
            value={token}
            onChange={setToken}
            numInputs={6}
            onChangeRegex={/^([0-9]{0,})$/}
            autoFocus
            isTypeText
            inputProps={{
              className: `${classes.inp}`,
            }}
          />
        </Form>
      </div>
      <div>
        <NavLink onClick={onGoBack} to={"/login"}>
          Go back
        </NavLink>
      </div>
    </Fragment>
  );
};

export default VerifyToken;
