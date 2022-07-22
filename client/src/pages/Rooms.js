import React, { useState, useEffect } from "react";
import RoomsLists from "../components/rooms/RoomsList";
import { fetchRooms } from "../lib/roomApi";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [roomError, setRoomError] = useState("");
  const [roomDataLoading, setRoomDataLoading] = useState(false);

  const fetchAvaialbleRooms = async () => {
    setRoomDataLoading(true);
    try {
      const data = await fetchRooms();
      if (!data && data.length < 0) {
        setRoomDataLoading(false);
        setRoomError(data.message);
      } else {
        setRoomDataLoading(false);
        setRooms(data);
      }
    } catch (error) {
      setRoomDataLoading(false);
      setRoomError(error.message);
    }
  };

  useEffect(() => {
    fetchAvaialbleRooms();
  }, []);
  return (
    <RoomsLists
      rooms={rooms}
      newRoomError={roomError}
      loadingRoom={roomDataLoading}
    />
  );
};

export default Rooms;
