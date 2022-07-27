const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
require("dotenv").config();
const User = require("../models/user");
const Profile = require("../models/profile");

// user signup configuration
exports.signup = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      const newUser = await new User(req.body);

      const userProfile = await new Profile({
        profilePicture: "uploads/dummyimage.jpg",
        user: {
          username: newUser.username,
          name: newUser.name,
          id: newUser._id,
        },
      });
      newUser.profile = userProfile;
      await userProfile.save();
      await newUser.save();
      res.status(200).json({ message: "success" });
    } else {
      return res
        .status(403)
        .json({ message: "User with the username already exist" });
    }
  } catch (error) {
    return res.status(404).json({ message: "Something went wrong" });
  }
};

// User signin configuration
exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res
        .status(401)
        .json({ error: "User with the provided username does not exist" });
    } else if (!user.authenticate(req.body.password)) {
      res.status(401).json({ error: "Incorrect username or password" });
    } else {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      res.cookie("t", token, { expire: new Date() + 9999 });
      res.json({ token, user });
    }
  } catch (error) {
    res.status(404).json({ error: "Something went wrong, try again later" });
  }
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  return res.json({ message: "Signout Successfully" });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});
