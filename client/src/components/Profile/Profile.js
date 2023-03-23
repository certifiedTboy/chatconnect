import React, { useState } from "react";
import About from "./About";
import RequestPage from "./RequestPage";
import FriendsPage from "./FriendsPage";
import ProfileHeader from "./ProfileHeader";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../lib/userApi";
import { loadingPage, showAllFriends, showAboutPage } from "./profileActions";
import LoadingSpinner from "../UI/LoadingSpinner";

const Profile = ({
  currentUserProfile,
  userprofilePicture,
  userFriendsList,
  updateTime,
}) => {
  const [friendsList, setFriendsList] = useState([]);

  const dispatch = useDispatch();
  const { profileLoading, friendsRequest, aboutPage, allFriends } = useSelector(
    (state) => state.profile
  );
  const { user } = useSelector((state) => state.login);

  const showAllUsersFriends = async () => {
    dispatch(loadingPage());
    try {
      const response = await getUserProfile(user);

      if (response) {
        dispatch(showAllFriends());
        setFriendsList(response.friendsList);
      }
      if (response.pending) {
        dispatch(loadingPage());
      }
    } catch (error) {}
  };

  return (
    <div className="container-fluid" style={{ marginTop: "-35px" }}>
      <div className="row">
        {/* PROFILE HEADER */}
        <ProfileHeader
          currentUserProfile={currentUserProfile}
          userprofilePicture={userprofilePicture}
          userFriendsList={userFriendsList}
        />

        {/* // FRIENDS */}
        <div className="row">
          <div className="col-12 col-lg-6 mt-4">
            <div
              className="p-4 shadow rounded-lg bg-white w-80"
              id="intro"
              style={{ width: "100%" }}
            >
              {/* Header */}
              <div className="flex justify-between">
                <h1 className="font-bold text-xl">Friends</h1>
                <a
                  onClick={showAllUsersFriends}
                  className="text-lg text-blue-700 hover:bg-blue-200"
                >
                  See All Friends
                </a>
              </div>
              {/* List */}
              <div className="">
                <p className="text-base text-gray-400">
                  {userFriendsList.length} friends
                </p>
                <div className="">
                  {userFriendsList.map((friend) => {
                    return (
                      <div className="bg-white p-0.5">
                        <img
                          src={`http://localhost:3001/${friend.profilePicture}`}
                          className="w-24 h-24 rounded-md mt-2 cursor-pointer"
                        />
                        <NavLink
                          to={`/user/userprofile/${friend.user.username}`}
                          className="font-semibold text-sm"
                        >
                          {friend.user.username}
                        </NavLink>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div>
              {profileLoading === true && <LoadingSpinner />}
              {aboutPage === true && (
                <About
                  currentUserProfile={currentUserProfile}
                  userprofilePicture={userprofilePicture}
                  updateTime={updateTime}
                />
              )}
              {/* {friendsRequest === true && <RequestPage />} */}
              {allFriends === true &&
                friendsList.map((friend) => {
                  return (
                    <FriendsPage
                      friendUsername={friend.username}
                      profilePicture={friend.profilePicture}
                    />
                  );
                })}
              {/* END POST */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
