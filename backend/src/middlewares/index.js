//validation and autorization middlewares
const User = require("../models/user");

exports.dataFieldLength = (req, res, next) => {
  if (
    req.body.username.trim().length <= 0 &&
    req.body.name.trim().length <= 0 &&
    req.body.phoneNumber.trim().length <= 0 &&
    req.body.email.trim().length <= 0 &&
    req.body.password.trim().length <= 0
  ) {
    return res.json({
      error: `Input fields cannot be empty 
        Ensure you provide all input fields correctly`,
    });
  }
  next();
};

exports.passwordValidity = (req, res, next) => {
  if (
    req.body.password.trim() !== req.body.confirmPassword.trim() ||
    req.body.password.trim().length <= 7
  ) {
    return res.json({
      error: `Invalid password Password must not be less than 8`,
    });
  }

  next();
};

exports.passwordFormat = (req, res, next) => {
  const { password } = req.body;
  const valid = {
    hasUpper: /[A-Z]/,
    hasLower: /[a-z]/,
    hasNumber: /[0-9]/,
    hasSpclChr: /[@,#,$,%,&]/,
  };

  if (
    !password.match(valid.hasUpper) &&
    !password.match(valid.hasLower) &&
    !password.match(valid.hasNumber) &&
    !password.match(valid.hasSpclChr)
  ) {
    return res.json({
      error: `invalid password format`,
    });
  }

  next();
};

exports.confirmPasswordFormat = (req, res, next) => {
  const { confirmPassword } = req.body;
  const valid = {
    hasUpper: /[A-Z]/,
    hasLower: /[a-z]/,
    hasNumber: /[0-9]/,
    hasSpclChr: /[@,#,$,%,&]/,
  };

  if (
    !confirmPassword.match(valid.hasUpper) &&
    !confirmPassword.match(valid.hasLower) &&
    !confirmPassword.match(valid.hasNumber) &&
    !confirmPassword.match(valid.hasSpclChr)
  ) {
    return res.json({
      error: `Passwords does not match`,
    });
  }

  next();
};

exports.aboutInputLength = (req, res, next) => {
  const {text} = req.body 
  if(text.trim().length > 1000){
    return res.status(401).json({error:"you cannot exceed 1000 characters"})
  }

  next()
}

exports.newPasswordValidity = (req, res, next) => {
  if (
    req.body.newPassword.trim() !== req.body.newConfirmPassword.trim() ||
    req.body.newPassword.trim().length <= 7
  ) {
    return res.json({
      error: `Invalid password Password must not be less than 8`,
    });
  }

  next();
};

exports.newPasswordFormat = (req, res, next) => {
  const { newPassword } = req.body;
  const valid = {
    hasUpper: /[A-Z]/,
    hasLower: /[a-z]/,
    hasNumber: /[0-9]/,
    hasSpclChr: /[@,#,$,%,&]/,
  };

  if (
    !newPassword.match(valid.hasUpper) &&
    !newPassword.match(valid.hasLower) &&
    !newPassword.match(valid.hasNumber) &&
    !newPassword.match(valid.hasSpclChr)
  ) {
    return res.json({
      error: `invalid password format`,
    });
  }

  next();
};

exports.newConfirmPasswordFormat = (req, res, next) => {
  const { newConfirmPassword } = req.body;
  const valid = {
    hasUpper: /[A-Z]/,
    hasLower: /[a-z]/,
    hasNumber: /[0-9]/,
    hasSpclChr: /[@,#,$,%,&]/,
  };

  if (
    !newConfirmPassword.match(valid.hasUpper) &&
    !newConfirmPassword.match(valid.hasLower) &&
    !newConfirmPassword.match(valid.hasNumber) &&
    !newConfirmPassword.match(valid.hasSpclChr)
  ) {
    return res.json({
      error: `Passwords does not match`,
    });
  }

  next();
};

exports.loginCredentialsValidity = (req, res, next) => {
  if (req.body.password.trim().length === 0 || req.body.username === "") {
    return res.json({
      error: `invalid login request`,
    });
  }

  next();
};
