const Rooms = require("../models/rooms");
const User = require("../models/user");

exports.checkThatRoomExist = async (topic) => {
  try {
    const room = await Rooms.findOne({ topic }).populate("Chat").exec();
    if (room) {
      return room;
    }

    return { error: "room does not exist" };
  } catch (error) {
    return error;
  }
};

exports.checkThatMessageIdExist = async (topic, userId) => {
  try {
    const user = await User.findById(userId);
    if (user) {
      const messageIdExist = user.friendsList.map((friend) => {
        return friend.messagingId === topic;
      });
      return messageIdExist;
    } else {
      return { error: "something went wrong" };
    }
  } catch (error) {
    return error;
  }
};

exports.createPrivateRoom = async (topic) => {
  try {
    const roomData = {
      topic,
      description: "",
      imgPath: "",
      type: "private",
    };
    const room = await Rooms.create(roomData);
    if (room) {
      return room;
    } else {
      return { error: "something went wrong" };
    }
  } catch (error) {
    return error;
  }
};

exports.getOtherRoomUserUsername = async (currentUsername, topic) => {
  try {
    const room = await Rooms.findOne({ topic }).populate("Chat").exec();
    if (room) {
      const Chat = room.Chat;

      const otherRoomUser = Chat.find((chat) => {
        if (chat.sender !== currentUsername) {
          return chat.sender;
        }
      });
      return otherRoomUser.sender;
      //   return currentRoomUser
    } else {
      return { error: "something went wrong" };
    }
  } catch (error) {
    return error;
  }
};
