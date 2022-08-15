// check to see if there is a token and header
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET } = process.env;

module.exports = (req, res, next) => {
  // get token from header
  const token = req.header("auth-token");

  if (!token) {
    return res
      .status(401)
      .json({ statusCode: 401, message: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, SECRET);

    req.user = decoded.user;

    next();
  } catch (error) {
    res.status(401).json({ satuseCode: 401, message: "Token is invalid" });
  }
};
