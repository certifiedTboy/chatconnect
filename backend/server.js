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
const { mongoConnect, mongoDisconnect } = require("./src/utils/db/dbConfig");
const roomRoutes = require("./src/routes/roomsRoute");
const authRoute = require("./src/routes/authRoute");
const requestRoute = require("./src/routes/requestRoute");
const userRoute = require("./src/routes/userRoutes");
const messageFormat = require("./src/utils/sockets/messages");
const Room = require("./src/models/rooms");
const Chat = require("./src/models/chat");
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

//jwt error handling
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: "invalid token" });
  }
});

// router middleware configuration
app.use("/", userRoute);
app.use("/", roomRoutes);
app.use("/", authRoute);
app.use("/", requestRoute);

const startServer = async () => {
  await mongoConnect();
  server.listen(PORT, () =>
    console.log(`Backend server is running on ${PORT}`)
  );

  sockets.listen(io);
};

startServer();
