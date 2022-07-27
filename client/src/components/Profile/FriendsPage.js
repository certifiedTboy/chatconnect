import React from "react";
import { NavLink } from "react-router-dom";

const FriendsPage = ({ friendsList }) => {
  return (
    <>
      <div className="container">
        <div className="row">
          {friendsList.map((friend) => {
            return (
              <div className="col-4">
                <div className="bg-white p-0.5">
                  <img
                    src={`http://localhost:3001/${friend.profilePicture}`}
                    className="w-24 h-24 rounded-md  cursor-pointer"
                  />
                  <NavLink to={`/user/userprofile/${friend.user.username}`}>
                    <p style={{ fontWeight: "600" }}>{friend.user.username}</p>
                  </NavLink>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default FriendsPage;
