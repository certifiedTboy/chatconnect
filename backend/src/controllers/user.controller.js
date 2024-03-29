const User = require("../models/user");
const Profile = require("../models/profile");

exports.getCurrentUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const currentUser = await User.findById(userId).select("-password");
    if (!currentUser) {
      return res.status(404).json({ error: "user not found" });
    }

    return res.status(200).json(currentUser);
  } catch (error) {
    res.status(400).json({ error: "something went wrong" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    // console.log(users);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
  }
};

exports.getUserProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username })
      .select("-password")
      .populate("profile")
      .exec();
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
      return res.json({ error: "Something went wrong" });
    }
    profile.save();
    user.profile = profile;
    user.save();
    res.json({ message: "success" });
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
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

// exports.commentToAbout = async (req, res) => {
//   const userId = req.user.id;
//   const { username } = req.params;
//   const { text } = req.body;

//   try {
//     const currentUser = await User.findById(userId);
//     const aboutOwner = await User.findOne({ username });
//     const userData = {
//       username: currentUser.username,
//       userId: currentUser._id,
//       name: currentUser.name,
//     };
//     const commentData = {
//       text,
//       userData,
//     };
//     const userAbout = aboutOwner.about;
//     userAbout.comments.push(commentData);
//     await aboutOwner.save();
//     console.log(aboutOwner);
//     res.status(200).json(aboutOwner);
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ error: "something went wrong" });
//   }
// };

// exports.reactToAbout = async (req, res) => {
//   const userId = req.user.id;
//   const { username } = req.params;
//   const { like } = req.body;
//   try {
//     const currentUser = await User.findById(userId);
//     const aboutOwner = await User.findOne({ username });
//     const userData = {
//       username: currentUser.username,
//       userId: currentUser._id,
//       name: currentUser.name,
//     };
//     const reactionData = {
//       like,
//       userData,
//     };
//     const userAbout = aboutOwner.profile;
//     userAbout.reactions.push(reactionData);
//     await aboutOwner.save();
//     res.status(200).json(aboutOwner);
//   } catch (error) {
//     res.status(400).json({ error: "something went wrong" });
//   }
// };

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
      .select("-password")
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
