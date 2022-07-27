import React, { useState, useEffect, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import ScrollToBottom from "react-scroll-to-bottom";
import { useSelector } from "react-redux";
import useSound from "use-sound";
import ebuddy from "../../sounds/ebuddy.mp3";
import { fetchRoomByTopic, fetchRooms } from "../../lib/roomApi";
import ChatForm from "./ChatForm.js";
import { useParams, useNavigate } from "react-router-dom";
import Conversation from "./Conversations/Conversation";
import Message from "./message/Message";
import ChatOnline from "./chatOnline/ChatOnline";
import { io } from "socket.io-client";
import "./Chat.css";
import messengerEffect from "../../sounds/messenger.mp3";

const Chat = () => {
  const socket = useRef(io("http://localhost:3001"));
  const { user } = useSelector((state) => state.login);
  const [currentRoom, setCurrentRoom] = useState("");
  const [roomChats, setRoomChats] = useState([]);
  const [socketRoomUsers, setSocketRoomUsers] = useState([]);
  const [socketMessage, setSocketMessage] = useState([]);
  const [filteredRoom, setFilteredRoom] = useState([]);
  const [typing, setIsTyping] = useState(false);
  const navigate = useNavigate();
  const [play2] = useSound(messengerEffect);
  const [play] = useSound(ebuddy);

  // extract room topic parameter from URL
  const params = useParams();
  const { topic } = params;

  useEffect(() => {
    // emit notification to room and other users when a new user joins room
    socket?.current.emit("joinRoom", {
      username: user,
      room: topic,
    });

    //emit general messages to room and other users
    socket?.current.on("message", (message) => {
      play();
      setSocketMessage((list) => [...list, message]);
    });

    //emit active room users to other users
    socket?.current.on("roomUsers", ({ room, users, usersProfile }) => {
      setCurrentRoom(room);
      let currentRoomUsers = usersProfile.filter((userProfile) =>
        users.some((user) => userProfile.user.username === user.username)
      );
      setSocketRoomUsers(currentRoomUsers);
    });
  }, [socket, topic]);

  console.log(socketRoomUsers);

  //send user typing notification to socket server
  useEffect(() => {
    socket?.current.on("typing", (data) => {
      setIsTyping(data);
    });
  }, []);

  // sending chats to socket server function
  const sendHandler = async (data) => {
    await socket.current.emit("chatMessage", data);
  };

  useEffect(() => {
    const fetchIdRoom = async () => {
      const allRooms = await fetchRooms();
      const roomData = await fetchRoomByTopic(topic);
      setRoomChats(roomData.Chat);
      const newRoom = allRooms.filter((room) => room.topic !== roomData.topic);
      setFilteredRoom(newRoom);
    };

    fetchIdRoom();
  }, []);

  const typingHandler = async (data) => {
    if (data.key != "Enter") {
      // play2();
      socket.current.emit("typing", {
        user: user,
        typing: true,
      });
    }

    if (data.trim().length === 0 || data === "stopTyping") {
      socket.current.emit("typing", {
        user: "",
        typing: false,
      });
    }
  };

  if (typing.typing === true) {
    play2();
  }

  return (
    <div className="container-fluid">
      <Row>
        <Col lg={3}>
          <h3>{currentRoom}</h3>
          <div className="chatMenuWrapper">
            {/* { socketRoomUsers.map((users) => ( */}
            <Conversation users={socketRoomUsers || []} />
            {/* ))} */}
          </div>
        </Col>
        <Col lg={6}>
          <hr />

          <div>
            <ScrollToBottom className="chatBoxTop">
              {socketMessage.map((chat) => (
                <Message
                  id={chat._id}
                  own={chat.sender === user}
                  sender={chat.sender}
                  message={chat.message}
                  time={chat.createdAt}
                  image={chat.userImage || ""}
                />
              ))}
            </ScrollToBottom>
            {typing.typing === true && (
              <div>
                <p className="typing">{typing.user} is typing ...</p>
              </div>
            )}

            <ChatForm onSubmit={sendHandler} onTyping={typingHandler} />
          </div>
        </Col>
        <Col lg={3}>
          <div className="chatOnline">
            <div className="chatOnlineWrapper">
              {filteredRoom.map((room) => (
                <div>
                  <ChatOnline
                    topic={room.topic}
                    description={room.description}
                    id={room._id}
                  />
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Chat;
