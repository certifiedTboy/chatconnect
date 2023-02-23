const express = require("express");
const { signup, signin, signout } = require("../controllers/auth.controller");
const {
  dataFieldLength,
  passwordValidity,
  passwordFormat,
  confirmPasswordFormat,
  loginCredentialsValidity,
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
router.get("/signout", signout);

module.exports = router;
