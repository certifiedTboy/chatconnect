const crypto = require("crypto");
const User = require("../models/user");

exports.sendRequest = async (req, res) => {
  const { senderUsername, receiverUsername } = req.body;
  try {
    const sender = await User.findOne({ username: senderUsername });
    const receiver = await User.findOne({ username: receiverUsername });
    if (sender && receiver) {
      const sentRequestAlreadySent = sender.sentRequest.find(
        (request) => request.username === receiver.username
      );
      const friendRequestAlreadyExist = receiver.request.find(
        (request) => request.username === sender.username
      );

      if (sentRequestAlreadySent || friendRequestAlreadyExist) {
        return res.status(400).json({ error: "something went wrong" });
      }

      const receiverName = {
        username: receiver.username,
      };
      sender.sentRequest.push(receiverName);
      const senderDetails = {
        userId: sender._id,
        username: sender.username,
      };
      receiver.request.push(senderDetails);
      sender.save();
      receiver.save();
      return res.status(200).json({ message: "success" });
    }
  } catch (error) {
    res.status(400).json({ error: "something went wrong" });
  }
};

exports.acceptRequest = async (req, res) => {
  const messagingId = crypto.randomBytes(5).toString("hex");
  try {
    const { currentUser, requestSenderName } = req.body;
    const user = await User.findOne({ username: currentUser });
    const sender = await User.findOne({ username: requestSenderName });
    const userFriendListDetails = {
      friendId: sender._id,
      friendName: sender.name,
      username: sender.username,

      messagingId,
    };

    const senderFriendListDetails = {
      friendId: user._id,
      friendName: user.name,
      username: user.username,
      messagingId,
    };

    const requestIndex = user.request.indexOf(sender.username);
    const sentRequestIndex = sender.sentRequest.indexOf(user.username);
    await sender.sentRequest.splice(sentRequestIndex, 1);
    await user.request.splice(requestIndex, 1);
    sender.friendsList.push(senderFriendListDetails);
    user.friendsList.push(userFriendListDetails);

    user.save();
    sender.save();
    return res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(400).json({ error: "something went wrong" });
  }
};

exports.cancelRequest = async (req, res) => {
  try {
    const { currentUser, requestSenderName } = req.body;
    const user = await User.findOne({ username: currentUser });
    const sender = await User.findOne({ username: requestSenderName });

    const requestIndex = user.sentRequest.indexOf(sender.username);
    const sentRequestIndex = sender.request.indexOf(user.username);
    await sender.request.splice(requestIndex, 1);
    await user.sentRequest.splice(sentRequestIndex, 1);

    user.save();
    sender.save();
    return res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(400).json({ error: "something went wrong" });
  }
};

exports.removeFriend = async (req, res) => {
  try {
    const { userUsername, friendUsername } = req.body;
    const user = await User.findOne({ username: userUsername });
    const friend = await User.findOne({ username: friendUsername });

    const userFriendIndex = user.friendsList.indexOf(friend.username);
    const friendFriendIndex = friend.friendsList.indexOf(user.username);
    await user.friendsList.splice(userFriendIndex, 1);
    await friend.friendsList.splice(friendFriendIndex, 1);

    user.save();
    friend.save();
    return res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(400).json({ error: "something went wrong" });
  }
};

exports.blockUser = async (req, res) => {
  try {
    const { userUsername, friendUsername } = req.body;
    const user = await User.findOne({ username: userUsername });
    const friend = await User.findOne({ username: friendUsername });

    const blockedUserDetails = {
      friendId: friend._id,
      friendName: friend.username,
    };
    user.blockedUsers.push(blockedUserDetails);
    user.save();
    return res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(400).json({ error: "something went wrong" });
  }
};

exports.getAllUserFriends = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "No user found" });
    }
    const friends = user.friendsList;
    return res.status(200).json(friends);
  } catch (error) {
    res.status(400).json({ error: "something went wrong" });
  }
};

exports.getSentRequest = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "something went wrong" });
    }
    const userRequest = user.sentRequest;
    return res.status(200).json({ userRequest });
  } catch (error) {
    res.status(400).json({ error: "something went wrong" });
  }
};

exports.getUserRequests = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "something went wrong" });
    }
    const requestOfUser = user.request;
    return res.status(400).json(requestOfUser);
  } catch (error) {
    res.status(400).json({ error: "something went wrong" });
  }
};
