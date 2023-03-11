import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VerifyToken from "./VerifyToken";
import ResetPasswordForm from "./ResetPasswordForm";
import SetNewPassword from "./SetNewPassword";
import {
  requestPasswordRest,
  verifyPasswordToken,
  setNewPassword,
} from "../../../lib/authApi";

const RequestPasswordReset = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [validMessage, setValidMessage] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [tokenIsValid, setTokenIsValid] = useState(false);
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  const onRequestPasswordReset = async (data) => {
    const response = await requestPasswordRest(data);
    if (response.error) {
      return setErrorMessage(response.error);
    }

    // setEmailIsValid(true);

    localStorage.setItem("emailIsValid", true);

    setErrorMessage("");
    setValidMessage(
      `A code has been sent to ${data.email}, enter code to reset password`
    );
  };

  const onVerifyPasswordToken = async (data) => {
    const response = await verifyPasswordToken(data);
    if (response.error) {
      return setErrorMessage(response.error);
    }

    localStorage.removeItem("emailIsValid");
    localStorage.setItem("tokenIsValid", true);
    localStorage.setItem("validToken", response.validToken);
    setErrorMessage("");
    setValidMessage("Enter new password");
  };

  const onSetNewPassword = async (data) => {
    const valid = {
      hasUpper: /[A-Z]/,
      hasLower: /[a-z]/,
      hasNumber: /[0-9]/,
      hasSpclChr: /[@,#,$,%,&]/,
    };

    if (data.newPassword.trim().length === 0) {
      setErrorMessage("Password field is empty");
      return;
    }
    if (data.newPassword.trim().length <= 7) {
      setErrorMessage("Password is too short, it must be 8 characters long");
      return;
    }
    if (!data.newPassword.match(valid.hasUpper)) {
      setErrorMessage("password must contain at least one upper case");
      return;
    }
    if (!data.newPassword.match(valid.hasLower)) {
      setErrorMessage("password must contain at least one lower case");
      return;
    }
    if (!data.newPassword.match(valid.hasNumber)) {
      setErrorMessage("password must contain at least a number");
      return;
    }
    if (!data.newPassword.match(valid.hasSpclChr)) {
      setErrorMessage(
        "password must contain multiple symbols of either @, #, $, %, &,(, )"
      );
      return;
    }

    if (data.newPassword !== data.newConfirmPassword) {
      setErrorMessage("password does not match");
      return;
    }
    const response = await setNewPassword(data);
    if (response.error) {
      return setErrorMessage(response.error);
    }

    localStorage.removeItem("validToken");
    localStorage.removeItem("tokenIsValid");
    navigate("/login");
  };

  useEffect(() => {
    const validEmail = localStorage.getItem("emailIsValid");
    setEmailIsValid(validEmail);
  }, [onRequestPasswordReset]);

  useEffect(() => {
    const tokenValidity = localStorage.getItem("tokenIsValid");
    const validToken = localStorage.getItem("validToken");
    setToken(validToken);
    setTokenIsValid(tokenValidity);
  }, [onVerifyPasswordToken]);

  const onGoBack = () => {
    localStorage.removeItem("emailIsValid");
    localStorage.removeItem("tokenIsValid");
    localStorage.removeItem("validToken");
  };

  return (
    <Fragment>
      <div className="col-12 col-lg-6">
        <div className="container">
          <div className="row">
            {!emailIsValid && !tokenIsValid && (
              <ResetPasswordForm
                errorMessage={errorMessage}
                validMessage={validMessage}
                onRequestPasswordReset={onRequestPasswordReset}
              />
            )}
            {emailIsValid && (
              <VerifyToken
                errorMessage={errorMessage}
                validMessage={validMessage}
                onVerifyPasswordToken={onVerifyPasswordToken}
                onGoBack={onGoBack}
              />
            )}

            {tokenIsValid && (
              <SetNewPassword
                errorMessage={errorMessage}
                validMessage={validMessage}
                onSetNewPassword={onSetNewPassword}
                token={token}
                onGoBack={onGoBack}
              />
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RequestPasswordReset;
