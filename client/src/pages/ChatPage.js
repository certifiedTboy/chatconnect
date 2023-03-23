import React, { useEffect, useCallback, useState } from "react";
import { fetchRoomByTopic } from "../lib/roomApi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createConnection } from "../components/Auth/LoginActions";
import Chat from "../components/Chats/Chat";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import "./Chat.css";

const ChatPage = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [roomTopic, setRoomTopic] = useState("");

  // extract room topic parameter from URL
  const params = useParams();
  const { topic } = params;

  const getRoomData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchRoomByTopic(topic);
      if (response.error) {
        setIsLoading(false);
        setErrorMessage(response.error);
      } else {
        setIsLoading(false);
        // setProfiles(availableUserProfile)
        setChatMessages(response.roomChats);
        setRoomTopic(response.topic);
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage("something went wrong");
    }
  }, [topic]);

  useEffect(() => {
    const getRoomDataByTopic = async () => {
      await getRoomData();
    };

    dispatch(createConnection());
    getRoomDataByTopic();
  }, []);

  if (isLoading) {
    return (
      <div className="centered" style={{ marginTop: 300 }}>
        <LoadingSpinner />
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="centered" style={{ marginTop: 300 }}>
        <p>Something Went Wrong</p>
      </div>
    );
  }
  return (
    <div>
      {roomTopic && chatMessages && !isLoading && !errorMessage && (
        <Chat chatMessages={chatMessages} roomTopic={roomTopic} />
      )}
    </div>
  );
};

export default ChatPage;
