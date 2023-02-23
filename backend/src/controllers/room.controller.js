const Rooms = require("../models/rooms");
const Chat = require("../models/chat");
const User = require("../models/user");
const {
  checkThatMessageIdExist,
  checkThatRoomExist,
  createPrivateRoom,
  getOtherRoomUserUsername,
} = require("../services/chatServices");
const { getUserProfilePicture } = require("../utils/sockets/users");

// var rooms = [
//   {
//     topic: "Sex",
//     description:
//       "A deep discussion about sex matters",
//     imgpath:
//       "https://st2.depositphotos.com/6903990/9767/i/600/depositphotos_97674118-stock-photo-fashion-woman-with-jewelry-set.jpg",
//     type: "public",
//   },
//   {
//     topic: "Relationship",
//     description:
//       "Share relationship ideas with others",
//     imgpath:
//       "https://static.toiimg.com/thumb/79680941.cms?width=680&height=512&imgsize=1000679",
//     type: "public",
//   },
//   {
//     topic: "News",
//     description:
//       "Get Updated News from all across the country",
//     imgpath:
//       "https://timesofindia.indiatimes.com/thumb/msid-79949926,width-1200,height-900,resizemode-4/79949926.jpg",
//     type: "public",
//   },
//   {
//     topic: "Music",
//     description:
//       "Share and talk about latest musics all around the world",
//     imgpath:
//       "https://media.wired.com/photos/5f9ca518227dbb78ec30dacf/master/w_2560%2Cc_limit/Gear-RIP-Google-Music-1194411695.jpg",
//     type: "public",
//   },
//   {
//     topic: "Comedy",
//     description: "Share comedy and jokes with others",
//     imgpath:
//       "https://images.theconversation.com/files/304864/original/file-20191203-67028-qfiw3k.jpeg?ixlib=rb-1.1.0&rect=638%2C2%2C795%2C745&q=45&auto=format&w=496&fit=clip",
//     type: "public",
//   },
//   {
//     topic: "Daily Horoscope",
//     description: "Learn About Zodiac Signs",
//     imgpath:
//       "https://www.pinkvilla.com/files/styles/contentpreview/public/daily_horoscope_july_10_2021.jpg?itok=mu0XcXTX",
//     type: "public",
//   },
//   {
//     topic: "Sport",
//     description:
//       "Discuss about global sports, from football to basket ball",
//     imgpath:
//       "https://www.icirnigeria.org/wp-content/uploads/2020/06/football.jpg",
//     type: "public",
//   },
//   {
//     topic: "Politics",
//     description:
//       "Learn About local and world politics",
//     imgpath:
//       "https://previews.123rf.com/images/axsimen/axsimen1604/axsimen160400108/55905176-vote-vector-illustration-ballot-and-politics-vote-icon-in-flat-style-hand-puts-voting-ballot-in-ball.jpg",
//     type: "public",
//   },
//   {
//     topic: "Movies",
//     description: "Discussion about latest movies",
//     imgpath: "https://sommersetretirement.com/assets/Movie-clipart.png",
//     type: "public",
//   },
// ];

// Rooms.create(rooms, (err, room) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(room);
//   }
// });

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Rooms.find({});
    if (!rooms) {
      res.json(404).json({ message: "No rooms found" });
    } else {
      const publicRooms = rooms.filter((room) => room.type === "public");
      res.status(200).json(publicRooms);
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

exports.getSingleRoom = async (req, res) => {
  const { topic } = req.params;
  const userId = req.user.id;
  try {
    const chats = [];
    const existingRoom = await checkThatRoomExist(topic);
    if (!existingRoom || existingRoom.error) {
      const messageIdDoesExist = await checkThatMessageIdExist(topic, userId);
      console.log(messageIdDoesExist);
      if (messageIdDoesExist || !messageIdDoesExist.error) {
        const room = await createPrivateRoom(topic);
        if (room) {
          return res
            .status(200)
            .json({ topic: room.topic, roomChats: room.Chat });
        } else {
          return res.status(400).json({ error: "something went wrong" });
        }
      } else {
        return res.status(400).json({ error: "something went wrong" });
      }
    } else {
      if (existingRoom.Chat.length > 0) {
        const currentUser = await User.findById(userId);
        const otherRoomUserUsername = await getOtherRoomUserUsername(
          currentUser.username,
          topic
        );

        const currentUserProfilePicture = await getUserProfilePicture(
          currentUser.username
        );
        const otherUserProfilePicture = await getUserProfilePicture(
          otherRoomUserUsername
        );

        const Chat = existingRoom.Chat;

        const currentRoomUserChats = Chat.filter((chat) => {
          let chatData;
          if (chat.sender === currentUser.username) {
            let createdChatData = {
              message: chat.message,
              sender: chat.sender,
              userImage: currentUserProfilePicture.profilePicture,
              createdAt: chat.createdAt,
            };
            chats.push(createdChatData);
          }

          return chatData;
        });

        const otherRoomUserChats = Chat.filter((chat) => {
          let otherChatData;
          if (chat.sender !== currentUser.username) {
            let otherCreatedData = {
              message: chat.message,
              sender: chat.sender,
              userImage: otherUserProfilePicture.profilePicture,
              createdAt: chat.createdAt,
            };

            chats.push(otherCreatedData);
          }
          return otherChatData;
        });

        const sortedChat = chats.sort((a, b) =>
          a.createdAt < b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0
        );

        return res.status(200).json({
          topic: existingRoom.topic,
          roomChats: sortedChat,
        });
      } else {
        return res.status(200).json({
          topic: existingRoom.topic,
          roomChats: existingRoom.Chat,
        });
      }
    }
  } catch (error) {
    return res.status(400).json({ error: "Something went wrong" });
  }
};

exports.getRoomData = async (req, res) => {
  try {
    const room = await Rooms.findOne({ topic: req.params.topic });
    if (!room) {
      return res.json(404).json({ error: "No rooms found" });
    } else {
      return res.status(200).json(room);
    }
  } catch (error) {
    return res.status(400).json({ error: "Something went wrong" });
  }
};
