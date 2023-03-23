import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const API_URL = "http://localhost:3001";

export const OnlineUsers = (user) => {
  const [activeUsers, setActiveUsers] = useState([]);
  const socket = useRef(io(API_URL));

  const getActiveUsers = () => {
    socket?.current.emit("joinRoom", {
      username: user,
      room: "general-room",
    });

    socket?.current.on("roomUsers", ({ room, users, usersProfile }) => {
      setActiveUsers(users);
    });
  };

  useEffect(() => {
    getActiveUsers();
  }, [socket]);

  // console.log(activeUsers);
  return activeUsers;
};
