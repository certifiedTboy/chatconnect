import React from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const FriendsPage = ({ friendUsername, friendProfilePicture }) => {
  const { user } = useSelector((state) => state.login);
  const params = useParams();
  const { username } = params;

  const noFriendContentForCurrentUser = (
    <h1
      style={{
        fontSize: "40px",
        textAlign: "center",
        margin: "70px auto",
      }}
    >
      You currently do not have a friend
    </h1>
  );

  const noFriendContentForOtherUser = (
    <h1
      style={{
        fontSize: "40px",
        textAlign: "center",
        margin: "70px auto",
      }}
    >
      User does not have friends
    </h1>
  );

  const friendContent = (
    <div className="bg-white p-1">
      <img
        src={`http://localhost:3001/${friendProfilePicture}`}
        className="w-24 h-24 rounded-md  cursor-pointer"
      />
      <NavLink to={`/user/userprofile/${friendUsername}`}>
        <p style={{ fontWeight: "600" }}>{friendUsername}</p>
      </NavLink>
    </div>
  );

  return (
    <div className="mt-5">
      {/* {user === username &&
        friendsList.length === 0 &&
        noFriendContentForCurrentUser}
      {user !== username &&
        friendsList.length === 0 &&
        noFriendContentForOtherUser} */}
      {friendContent}
    </div>
  );
};

export default FriendsPage;
