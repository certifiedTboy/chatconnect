const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  getUserProfilePicture,
  getAllUsersProfile,
  checkThatRoomExist,
} = require("./utils/sockets/users");
const {
  generalMessageFormat,
  userMessageFormat,
} = require("./utils/sockets/messages");
const Room = require("./models/rooms");
const Chat = require("./models/chat");
const User = require("./models/user");
const Profile = require("./models/profile");

const listen = (io) => {
  const botName = "T-robotics";

  // Run when client connects
  io.on("connection", (socket) => {
    socket.on("joinRoom", async ({ username, room }) => {
      const roomExist = await checkThatRoomExist(room);
      const user = userJoin(socket.id, username, room, roomExist.type);
      socket.join(user.room);

      if (user.roomType === "public") {
        // Welcome current user
        socket.emit(
          "message",
          generalMessageFormat(
            botName,
            `Welcome to ${user.room} Room, where you discuss about ${user.room} issues!`,
            "uploads/bot.png"
          )
        );

        // Broadcast to other room users when a user connects
        socket.broadcast
          .to(user.room)
          .emit(
            "message",
            generalMessageFormat(
              botName,
              `${user.username} has joined the chat`,
              "uploads/bot.png"
            )
          );
      } else {
        // Broadcast to other room users when a user connects
        socket.broadcast
          .to(user.room)
          .emit(
            "message",
            generalMessageFormat(
              botName,
              `${user.username} is online`,
              "uploads/bot.png"
            )
          );
      }

      // Send users and room info to client

      //continue from here to change user conversation
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
        usersProfile: await getAllUsersProfile(),
      });
    });

    // Listen for chatMessage
    socket.on("chatMessage", async (msg) => {
      const user = getCurrentUser(socket.id);
      const image = await getUserProfilePicture(user.username);
      let dummyImage = "uploads/dummyimage";
      const userImage = image ? image.profilePicture : dummyImage;
      io.to(user.room).emit(
        "message",
        userMessageFormat(msg.sender, msg.message, userImage)
      );

      if (user.roomType === "private") {
        // save chatmessage to database
        let chatMessage = new Chat({
          message: msg.message,
          sender: msg.sender,
        });
        await chatMessage.save();
        const currentRoom = await Room.findOne({ topic: user.room });
        currentRoom.Chat.push(chatMessage);
        await currentRoom.save();
      }
    });

    // user typing
    socket.on("typing", (data) => {
      const user = getCurrentUser(socket.id);
      if (data.typing) {
        return socket.broadcast.to(user.room).emit("typing", data);
      } else {
        socket.broadcast.to(user.room).emit("typing", data);
      }
    });

    // Runs when client disconnects
    socket.on("disconnect", async () => {
      const user = userLeave(socket.id);
      if (user) {
        if (user.roomType === "public") {
          socket.broadcast
            .to(user.room)
            .emit(
              "message",
              generalMessageFormat(
                botName,
                `${user.username} has left the chat`,
                "uploads/bot.png"
              )
            );

          // Send users and room info
          io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: getRoomUsers(user.room),
            profile: await getAllUsersProfile(),
          });
        } else {
          socket.broadcast
            .to(user.room)
            .emit(
              "message",
              generalMessageFormat(
                botName,
                `${user.username} is offline`,
                "uploads/bot.png"
              )
            );

          // Send users and room info
          io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: getRoomUsers(user.room),
            profile: await getAllUsersProfile(),
          });
        }
      }
    });
  });
};

module.exports = {
  listen,
};
