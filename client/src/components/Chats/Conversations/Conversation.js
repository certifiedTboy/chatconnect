import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Conversation.css";

const Conversation = ({ users }) => {
  const [userSearchData, setUserSearchData] = useState("");
  const [searchedUser, setSearchedUser] = useState([]);
  const searchDataHandler = (event) => {
    setUserSearchData(
      event.target.value
        .toLowerCase()
        .replace(/(^|\s)\S/g, (L) => L.toUpperCase())
    );
  };

  const filterSearchUsers = () => {
    let filteredUsersBySearch = users.filter((user) => {
      return user.user.username.includes(userSearchData);
    });

    setSearchedUser(filteredUsersBySearch);
  };
  useEffect(() => {
    filterSearchUsers();
  }, [userSearchData, users]);

  return (
    <div className="show">
      <input
        className="chatMenuInput"
        placeholder="Search active room users..."
        onChange={searchDataHandler}
      />
      {searchedUser.map((user) => {
        return (
          <div className="conversation">
            {user.profilePicture ? (
              <img
                className="conversationImg"
                src={`http://localhost:3001/${user.profilePicture}`} alt="profile of user"
              />
            ) : (
              <img src="" alt="profile of user" />
            )}
            <NavLink to={`/user/userprofile/${user.user.username}`}>
              {" "}
              <span className="conversationName">{user.user.username}</span>
            </NavLink>
          </div>
        );
      })}
    </div>
  );
};

export default Conversation;
