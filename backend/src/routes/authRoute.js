const express = require("express");
const {
  signup,
  signin,
  signout,
  resetPasswordRequest,
  verifyResetPasswordToken,
  createNewPassword,
} = require("../controllers/auth.controller");
const {
  dataFieldLength,
  passwordValidity,
  passwordFormat,
  confirmPasswordFormat,
  loginCredentialsValidity,
  newPasswordFormat,
  newPasswordValidity,
  newConfirmPasswordFormat,
} = require("../middlewares/index");
const router = express.Router();

router.post(
  "/signup",
  dataFieldLength,
  passwordValidity,
  passwordFormat,
  confirmPasswordFormat,
  signup
);
router.post("/signin", loginCredentialsValidity, signin);
router.post("/reset-password-request", resetPasswordRequest);
router.post("/verify-token", verifyResetPasswordToken);
router.get("/signout", signout);

router.post(
  "/reset-password",
  newPasswordValidity,
  newPasswordFormat,
  newConfirmPasswordFormat,
  createNewPassword
);

module.exports = router;
