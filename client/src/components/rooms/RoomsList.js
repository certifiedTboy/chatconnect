import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";

const RoomsLists = (props) => {
  const { rooms, newRoomError, loadingRoom } = props;

  const publicRooms = rooms.filter((room) => room.type === "public")

  if (loadingRoom) {
    return (
      <div className="centered" style={{ marginTop: 300 }}>
        <LoadingSpinner />
      </div>
    );
  }

  if (newRoomError) {
    return (
      <div className="centered" style={{ marginTop: 300 }}>
        <p>Something Went Wrong</p>
      </div>
    );
  }

  if (rooms.length < 0) {
    return (
      <div className="centered" style={{ marginTop: 300 }}>
        <p>Something Went Wrong</p>
      </div>
    );
  }

  const roomDetails = publicRooms.map((room) => {
    return (
      <div key={room._id} className="col-lg-4 mb-4 cardy col-sm-6 col-lg-4">
        <div className="centered2">{loadingRoom && <LoadingSpinner />}</div>
        <div className="card" style={{ width: 250 }}>
          <img src={room.imgpath} className="card-img-top" alt="..." />
          <div className="card-body">
            <div className="text-center">
              <h5 className="card-title">
                <strong>{room.topic}</strong>
              </h5>
              <p className="card-text">{room.description}</p>
              {/* <JoinRoom /> */}
              <NavLink className="btn btn-success" to={`/rooms/${room.topic}`}>
                {" "}
                Join Room{" "}
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">{roomDetails}</div>
    </div>
  );
};

export default RoomsLists;
