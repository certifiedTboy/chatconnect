import React, { useState, useEffect, useRef, useCallback } from "react";
import { Col, Row, Container } from "react-bootstrap";
import ScrollToBottom from "react-scroll-to-bottom";
import { useSelector } from "react-redux";
import useSound from "use-sound";
import ebuddy from "../../sounds/ebuddy.mp3";
import { fetchRooms } from "../../lib/roomApi";
import ChatForm from "./chatform/ChatForm";
import Conversation from "./Conversations/Conversation";
import Message from "./message/Message";
import ChatOnline from "./chatOnline/ChatOnline";
import { io } from "socket.io-client";
import messengerEffect from "../../sounds/messenger.mp3";
import "./Chat.css";

const Chat = ({ chatMessages, roomTopic }) => {

    const API_URL = "http://localhost:3001"
    // const API_URL = "https://chatconnect-backend-production.up.railway.app"
    const socket = useRef(io(API_URL));
    const { user } = useSelector((state) => state.login);
    const [currentRoom, setCurrentRoom] = useState("");
    const [socketRoomUsers, setSocketRoomUsers] = useState([]);
    //private Chat
    const [socketMessage, setSocketMessage] = useState(chatMessages);
    const [filteredRoom, setFilteredRoom] = useState([]);
    const [isTyping, setIsTyping] = useState({});
    const [play2] = useSound(messengerEffect);
    const [play] = useSound(ebuddy);





    useEffect(() => {
        // emit notification to room and other users when a new user joins room
        socket?.current.emit("joinRoom", {
            username: user,
            room: roomTopic,
        });

        //emit general messages to room and other users
        socket?.current.on("message", (message) => {
            console.log(message)
            play();
            setSocketMessage((chatMessages) => [...chatMessages, message]);
        });

        //emit active room users to other users
        socket?.current.on("roomUsers", ({ room, users, usersProfile }) => {
            setCurrentRoom(room);
            let currentRoomUsers = usersProfile.filter((userProfile) =>
                users.some((user) => userProfile.user.username === user.username)
            );
            setSocketRoomUsers(currentRoomUsers);
        });
    }, [socket, user]);


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
            // const roomData = await fetchRoomData(roomTopic);
            const newRoom = allRooms?.filter((room) => room.topic !== roomTopic);
            setFilteredRoom(newRoom);
        };

        fetchIdRoom();
    }, []);

    const typingHandler = useCallback(async (data) => {

        if (data !== "Enter") {
            socket.current.emit("typing", {
                user: user,
                typing: true,
            })
        }

        if (data === "Enter" || data === "stopTyping") {
            socket.current.emit("typing", {
                user: "",
                typing: false,
            });

        }

    }, []);

    if (isTyping.typing) {
        play2();
    }

    return (
        <Container fluid>
            <Row>
                <Col sm={12} md={3} lg={3}>
                    <h3>{currentRoom}</h3>
                    <div className="chatMenuWrapper show">
                        <Conversation users={socketRoomUsers || []} />
                    </div>
                </Col>
                <Col sm={12} lg={6} md={6}>
                    <hr />

                    <div>

                        <ScrollToBottom className="chatBoxTop">
                            {socketMessage.map((chat) => (
                                <Message
                                    id={chat._id}
                                    own={chat.sender === user}
                                    sender={chat.sender}
                                    message={chat.message}
                                    time={chat.createdAt || new Date()}
                                    image={chat.userImage}
                                />
                            ))}
                        </ScrollToBottom>
                        {isTyping.user !== "" && isTyping.typing === true && (
                            <div>
                                <p className="typing">{isTyping.user} is typing ...</p>
                            </div>
                        )}

                        <ChatForm onSubmit={sendHandler} onTyping={typingHandler} />
                    </div>
                </Col>
                <Col sm={12} md={3} lg={3}>
                    <div className="chatOnline show">
                        <div className="chatOnlineWrapper">
                            {filteredRoom.map((room) => (
                                <div>
                                    <ChatOnline
                                        topic={room.topic}
                                        description={room.description}
                                        id={room._id}
                                        imgpath={room.imgpath}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Chat;
