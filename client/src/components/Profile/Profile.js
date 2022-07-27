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
    <div className="h-screen">
      <div className="mt-14 shadow bg-white h-screen">
        {/* PROFILE HEADER */}
        <ProfileHeader
          currentUserProfile={currentUserProfile}
          userprofilePicture={userprofilePicture}
          userFriendsList={userFriendsList}
        />
        {/* END PROFILE HEADER */}

        {/* // CONTENT */}
        <div>
          <div className="bg-gray-100 ">
            <div className="flex justify-center h-screen">
              {/* LEFT */}
              <div>
                {/* // INTRO */}
                <div className="mr-12 mt-4">
                  <div
                    className="p-4 shadow rounded-lg bg-white w-80"
                    id="intro"
                  >
                    <h1 className="font-bold text-xl">Intro</h1>
                    <p>Full Stack Web Developer</p>
                  </div>
                </div>

                {/* // FRIENDS */}
                <div className="mr-12 mt-4">
                  <div
                    className="p-4 shadow rounded-lg bg-white w-80"
                    id="intro"
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
                      <div className="grid grid-cols-3 gap-1">
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
                {/* // END FRIENDS */}
              </div>
              {/* END LEFT */}

              {/* // POST LIST */}
              <div className="w-2/5">
                {/* CREATE POST */}
                {/* <CreatePost /> */}
                {/* END CREATE POST */}

                {/* POST */}
                {profileLoading === true && <LoadingSpinner />}
                {aboutPage === true && <About />}
                {friendsRequest === true && <RequestPage />}
                {allFriends === true && (
                  <FriendsPage friendsList={userFriendsList} />
                )}
                {/* END POST */}
              </div>
              {/* // END POST LIST */}
            </div>
          </div>
        </div>
        {/* // END CONTENT */}
      </div>
    </div>
  );
};

export default Profile;
