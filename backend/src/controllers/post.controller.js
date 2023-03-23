const Post = require("../models/post");
const User = require("../models/user");
const { checkThatUserExistById } = require("../services/userServices");
const {
  checkThatAboutExist,
  checkThatUserAlreadyReactToAbout,
} = require("../services/postServices");

exports.createAbout = async (req, res) => {
  const { text } = req.body;
  const userId = req.user.id;

  try {
    const currentUser = await checkThatUserExistById(userId);
    if (!currentUser) {
      return res.status(401).json({ error: "something went wrong" });
    }
    const about = new Post({
      text,
      username: currentUser.username,
      userId: currentUser.id,
    });
    await about.save();
    const aboutData = {
      text: about.text,
      aboutId: about._id,
    };
    currentUser.about = aboutData;
    await currentUser.save();

    res.status(201).json({ message: "success", about });
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
  }
};

exports.getUserAbout = async (req, res) => {
  const { username } = req.params;

  try {
    const abouts = await Post.find({});
    const filteredAbout = abouts.filter((about) => about.username === username);
    const aboutIndex = filteredAbout.length - 1;
    const userAbout = filteredAbout[aboutIndex];
    if (!userAbout) {
      return res.status(400).json({ error: "no about yet" });
    }
    return res.status(200).json({ message: "success", userAbout });
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
  }
};

exports.reactToAbout = async (req, res) => {
  const userId = req.user.id;
  const { reaction } = req.body;
  const { aboutId } = req.params;

  try {
    const user = await checkThatUserExistById(userId);
    const about = await checkThatAboutExist(aboutId);

    if (!user || !about) {
      return res.status(400).json({ error: "something went wrong" });
    }

    const userAlreadyReactedToAbout = await checkThatUserAlreadyReactToAbout(
      about,
      userId
    );

    if (!userAlreadyReactedToAbout) {
      const reactionData = {
        userId: user._id,
        username: user.username,
        name: user.name,
        reaction,
      };
      about.reactions.push(reactionData);
      await about.save();
      return res.status(201).json({ message: "success", about });
    } else {
      // remove reaction from associated post
      const userAboutReactionIndex = about.reactions.indexOf(
        (reaction) => reaction.userId === user._id
      );
      about.reactions.splice(userAboutReactionIndex, 1);

      await about.save();
      return res.status(200).json({ message: "reaction removed" });
    }
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
  }
};
