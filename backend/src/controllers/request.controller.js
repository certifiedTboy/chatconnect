const crypto = require("crypto");
const User = require("../models/user");

exports.sendRequest = async (req, res) => {
  try {
    const { senderUsername, receiverUsername } = req.body;
    const sender = await User.findOne({ username: senderUsername });
    const receiver = await User.findOne({ username: receiverUsername });
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

    console.log(sender);
    console.log(receiver);
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(400).json({ error: "something went wrong" });
  }
};

exports.acceptRequest = async (req, res) => {
  const messagingId = await crypto.randomBytes(20).toString("hex");
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

    const requestIndex = user.request.indexOf(sender._id);
    const sentRequestIndex = sender.sentRequest.indexOf(user.username);
    await sender.sentRequest.splice(sentRequestIndex, 1);
    await user.request.splice(requestIndex, 1);
    sender.friendsList.push(senderFriendListDetails);
    user.friendsList.push(userFriendListDetails);

    user.save();
    sender.save();
    console.log(user);
    console.log(sender);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(400).json({ error: "something went wrong" });
  }
};

exports.cancelRequest = async (req, res) => {
  try {
    const { currentUser, requestSender } = req.body;
    const user = await User.findOne({ username: currentUser });
    const sender = await User.findOne({ username: requestSender });

    const requestIndex = user.request.indexOf(sender._id);
    const sentRequestIndex = sender.sentRequest.indexOf(user.username);
    await sender.sentRequest.splice(sentRequestIndex, 1);
    await user.request.splice(requestIndex, 1);

    user.save();
    sender.save();
    console.log(user);
    console.log(sender);
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

    const userFriendIndex = user.friendsList.indexOf(friend._id);
    const friendFriendIndex = friend.friendsList.indexOf(user._id);
    await user.friendsList.splice(userFriendIndex, 1);
    await friend.friendsList.splice(friendFriendIndex, 1);

    user.save();
    friend.save();
    console.log(user);
    console.log(friend);
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

// var colors = ["red", "blue", "car", "green"];
// var carIndex = colors.indexOf("car"); //get  "car" index
// //remove car from the colors array
// colors.splice(carIndex, 1);
