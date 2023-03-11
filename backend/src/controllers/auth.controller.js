const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Profile = require("../models/profile");
const { checkThatUserExist } = require("../services/userServices");
const {
  createPasswordResetCode,
  checkThatPasswordResetTokenIsValid,
} = require("../services/accountVerificationService");
const bcrypt = require("bcrypt");
const {
  sendUserVerificationEmail,
  sendPasswordResetToken,
} = require("../utils/email/sendEmail");
require("dotenv").config();
const { SECRET } = process.env;

// user signup configuration
exports.signup = async (req, res) => {
  const { username, name, email, phoneNumber, password } = req.body;
  try {
    const user = await checkThatUserExist(username);
    if (user) {
      return res
        .status(403)
        .json({ message: "User with the username already exist" });
    }
    // hash provided password with bcrypt module
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await new User({
      username,
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    });

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
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// User signin controller function
exports.signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });

    if (!user) {
      return res
        .status(400)
        .json({ statuseCode: 400, error: "Incorrect username or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ statusCode: 400, error: "Incorrect username or password" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      SECRET,
      {
        expiresIn: 36000,
      },
      (err, token) => {
        if (err) {
          throw err;
        }
        const userData = {
          C_U: user.username,
        };
        res.cookie("auth-token", token).json({
          statusCode: 200,
          message: "success",
          userData,
          token,
        });
      }
    );
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

exports.resetPasswordRequest = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res
        .status(400)
        .json({ error: "No account associated to email address" });
    } else {
      const generatedToken = await createPasswordResetCode(user._id);

      if (!generatedToken.error) {
        await sendPasswordResetToken(user.email, user.name, generatedToken);
        return res.status(200).json({ message: "success" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: "something went wrong" });
  }
};

exports.verifyResetPasswordToken = async (req, res) => {
  const { token } = req.body;
  try {
    const validToken = await checkThatPasswordResetTokenIsValid(token);
    if (validToken.error) {
      return res.status(400).json({ error: "invalid token" });
    }

    return res.status(400).json({ message: "success", validToken });
  } catch (error) {
    return res.status(400).json({ error: "invalid token" });
  }
};

exports.createNewPassword = async (req, res) => {
  const { newPassword, token } = req.body;
  try {
    const user = await User.findOne({ resetPasswordToken: token });
    console.log(user);
    if (!user) {
      return res.status(400).json({ error: "invalid or expired token" });
    }
    // hash provided password with bcrypt module
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(400).json({ error: "something went wrong" });
  }
};

exports.signout = (req, res) => {
  res.clearCookie("auth-token");
  return res.json({ message: "Signout Successfully" });
};
