const User = require("../models/user");
const Profile = require("../models/profile");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    // console.log(users);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .populate("profile")
      .exec();

    if (!user) {
      return res.status(404).json({ message: "Something went wrong" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

exports.userById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id).exec();
    if (!user) {
      return res.status(400).json({ message: "No user found" });
    }
    req.profile = user;
    next();
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find({});
    if (!profiles || profiles.length === 0) {
      return res.status(404).json({ error: "No profile found" });
    }
    return res.status(200).json(profiles);
  } catch (error) {
    res.status(400).json({ error: "something went wrong" });
  }
};

exports.uploadProfilePicture = async (req, res) => {
  const x = "uploads/" + req.file.filename;
  try {
    const user = await User.findOne({ username: req.params.username });
    const profilePicture = new Profile({
      profilePicture: x,
      user: {
        username: user.username,
        id: user._id,
      },
    });
    if (!profilePicture) {
      return res.json({ message: "Something went wrong" });
    }
    profilePicture.save();
    user.profile = profilePicture;
    user.save();
    res.json({ msg: "success" });
  } catch (error) {
    res.status(404).json({ message: "something went wrong" });
  }
};

exports.searchUsers = async (req, res) => {
  const { searchdata } = req.params;
  try {
    const users = await User.find({
      $or: [
        { username: { $regex: searchdata } },
        { name: { $regex: searchdata } },
        { email: { $regex: searchdata } },
        { phoneNumber: { $regex: searchdata } },
      ],
    })
      .populate("profile")
      .exec();

    if (!users || users.length === 0) {
      return res.json({ error: "No user found" });
    }

    return res.status(200).json(users);
  } catch (error) {
    res.json({ error: "Something went wrong" });
  }
};

exports.hasAuthorization = async (req, res, next) => {
  try {
    const authorized = req.profile && req.auth && req.profile._id === req.auth;
    if (!authorized) {
      return res
        .status(403)
        .json({ message: "User is not authorized to perform this action" });
    }
    next();
  } catch (error) {
    res.status(404).json({ message: "something went wrong" });
  }
};

exports.getUser = async (req, res) => {
  return res.json(req.profile);
};
