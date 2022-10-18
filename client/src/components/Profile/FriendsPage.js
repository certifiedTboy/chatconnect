import React from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const FriendsPage = ({ friendsList }) => {
  console.log(friendsList);
  const { user } = useSelector((state) => state.login);
  const params = useParams();
  const { username } = params;

  const noFriendContentForCurrentUser = (
    <>
      <div className="col-4"></div>{" "}
      <div className="col-4">
        {" "}
        <h1
          style={{
            fontSize: "40px",
            textAlign: "center",
            margin: "70px auto",
          }}
        >
          You currently do not have a friend
        </h1>{" "}
      </div>{" "}
      <div className="col-4"> </div>{" "}
    </>
  );

  const noFriendContentForOtherUser = (
    <>
      <div className="col-4"></div>{" "}
      <div className="col-4">
        {" "}
        <h1
          style={{
            fontSize: "40px",
            textAlign: "center",
            margin: "70px auto",
          }}
        >
          User does not have friends
        </h1>{" "}
      </div>{" "}
      <div className="col-4"> </div>{" "}
    </>
  );

  const friendContent = (
    <>
      <div className="container">
        <div className="row">
          {friendsList.map((friend) => {
            return (
              <div className="col-4">
                <div className="bg-white p-1">
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

  return (
    <div className="mt-5">
      {user === username &&
        friendsList.length === 0 &&
        noFriendContentForCurrentUser}
      {user !== username &&
        friendsList.length === 0 &&
        noFriendContentForOtherUser}
      {friendsList.length > 0 && friendContent}
    </div>
  );
};

export default FriendsPage;
