const User = require("../models/user");

const checkThatUserExist = async (username) => {
  const user = await User.findOne({ username });
  if (user) {
    return user;
  }
};

const checkThatUserExistById = async (userId) => {
  const user = await User.findById(userId);
  if (user) {
    return user;
  }
};

module.exports = {
  checkThatUserExist,
  checkThatUserExistById,
};
