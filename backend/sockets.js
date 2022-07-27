const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  getUserProfilePicture,
  getAllUsersProfile,
} = require("./src/utils/sockets/users");
const {
  generalMessageFormat,
  userMessageFormat,
} = require("./src/utils/sockets/messages");
const Room = require("./src/models/rooms");
const Chat = require("./src/models/chat");
const User = require("./src/models/user");
const Profile = require("./src/models/profile");

const listen = (io) => {
  const botName = "T-robotics";

  // Run when client connects
  io.on("connection", (socket) => {
    socket.on("joinRoom", async ({ username, room }) => {
      const user = userJoin(socket.id, username, room);

      socket.join(user.room);

      // Welcome current user
      socket.emit(
        "message",
        generalMessageFormat(
          botName,
          `Welcome to ${user.room} Room, where you discuss about ${user.room} issues!`
        )
      );

      // Broadcast to other room users when a user connects
      socket.broadcast
        .to(user.room)
        .emit(
          "message",
          generalMessageFormat(botName, `${user.username} has joined the chat`)
        );

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
      let dummyImage = "/public/uploads/dummyimage";
      const userImage = image ? image.profilePicture : dummyImage;
      io.to(user.room).emit(
        "message",
        userMessageFormat(msg.sender, msg.message, userImage)
      );
      // dbconnection.then((db) => {
      //   let chatMessage = new Chat({
      //     message: msg.message,
      //     sender: msg.sender,
      //   });
      //   chatMessage.save();
      //   Room.findOne({ topic: user.room }, (err, rooms) => {
      //     rooms.Chat.push(chatMessage);
      //     rooms.save();
      //   });
      // });
    });

    // user typing
    socket.on("typing", (data) => {
      const user = getCurrentUser(socket.id);
      if (data.typing === true)
        socket.broadcast.to(user.room).emit("typing", data);
      else socket.broadcast.to(user.room).emit("typing", data);
    });

    // Runs when client disconnects
    socket.on("disconnect", async () => {
      const user = userLeave(socket.id);

      if (user) {
        io.to(user.room).emit(
          "message",
          generalMessageFormat(botName, `${user.username} has left the chat`)
        );

        // Send users and room info
        io.to(user.room).emit("roomUsers", {
          room: user.room,
          users: getRoomUsers(user.room),
          profile: await getAllUsersProfile(),
        });
      }
    });
  });
};

module.exports = {
  listen,
};
