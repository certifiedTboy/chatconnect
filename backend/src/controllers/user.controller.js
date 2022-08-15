const User = require("../models/user");
const Profile = require("../models/profile");

exports.getCurrentUser = async (req, res) => {
  const userId = req.user.id;
  console.log(userId);
  try {
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ error: "user not found" });
    }
    console.log(currentUser.username);
    return res.status(200).json(currentUser.username);
  } catch (error) {
    res.status(400).json({ error: "something went wrong" });
  }
};

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
  const { username } = req.params;
  try {
    const user = await User.findOne({ username }).populate("profile").exec();
    if (!user) {
      return res.status(404).json({ message: "Something went wrong" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
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
    res.status(500).json({ error: "something went wrong" });
  }
};

exports.uploadProfilePicture = async (req, res) => {
  const userId = req.user.id;
  const x = "uploads/" + req.file.filename;
  try {
    const user = await User.findById(userId);
    const profileId = user.profile._id;
    const profile = await Profile.findByIdAndUpdate(profileId, {
      profilePicture: x,
      user: {
        username: user.username,
        id: user._id,
      },
    });
    if (!profile) {
      return res.json({ message: "Something went wrong" });
    }
    profile.save();
    user.profile = profile;
    user.save();
    res.json({ msg: "success" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.user.id;
  const { updateData } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      (error, newUser) => {
        if (error) {
          return res.status(400).json({ error: "something went wrong" });
        }
        return res.status(200).json({ message: "success" });
      }
    );
  } catch (error) {
    res.status(400).json({ error: "something went wrong" });
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

exports.getUser = async (req, res) => {
  return res.json(req.profile);
};
