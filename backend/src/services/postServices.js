const Post = require("../models/post");

const checkThatAboutExist = async (aboutId) => {
  const about = await Post.findById(aboutId);
  return about;
};

const checkThatUserAlreadyReactToAbout = async (aboutData, userId) => {
  const alreadyReactToAbout = aboutData.reactions.find(
    (reaction) => reaction.userId.toString() === userId
  );
  return alreadyReactToAbout;
};

module.exports = { checkThatAboutExist, checkThatUserAlreadyReactToAbout };
