"use strict";
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const { mongoConnect, mongoDisconnect } = require("./utils/db/dbConfig");
const roomRoutes = require("./routes/roomsRoute");
const authRoute = require("./routes/authRoute");
const requestRoute = require("./routes/requestRoute");
const userRoute = require("./routes/userRoutes");
const postRoute = require("./routes/postRoute");
const messageFormat = require("./utils/sockets/messages");
const Room = require("./models/rooms");
const Chat = require("./models/chat");
const sockets = require("./sockets");

require("dotenv").config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static("public"));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// router middleware configuration
app.use("/", userRoute);
app.use("/", roomRoutes);
app.use("/", authRoute);
app.use("/", requestRoute);
app.use("/", postRoute);

app.use(express.static(path.join(__dirname, "..", "public")));

const startServer = async () => {
  await mongoConnect();
  server.listen(PORT, () =>
    console.log(`Backend server is running on port: ${PORT}`)
  );

  sockets.listen(io);
};

startServer();
