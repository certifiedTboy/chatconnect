const User = require("../../models/user");
const Profile = require("../../models/profile");
const users = [];

// Join user to chat
function userJoin(id, username, room) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

// Get current user
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

const getUserProfilePicture = async (currentUserName) => {
  const response = await User.findOne({ username: currentUserName })
    .populate("profile")
    .exec();
  return response.profile;
};

const getAllUsersProfile = async (currentUserName) => {
  const response = await Profile.find({});
  return response;
};

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  getUserProfilePicture,
  getAllUsersProfile,
};
