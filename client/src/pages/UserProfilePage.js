import React, { useState, useEffect } from "react";
import Profile from "../components/Profile/Profile";
import { useParams } from "react-router-dom";
import { getUserProfile, getAllProfiles } from "../lib/userApi";

const UserProfilePage = () => {
  const params = useParams();
  const { username } = params;

  const [userProfile, setUserProfile] = useState({});
  const [userFriendsList, setUserFriendsList] = useState([]);
  const [userprofilePicture, setUserprofilePicture] = useState("");
  const [allProfiles, setAllProfiles] = useState([]);
  const [friends, setFriends] = useState([]);
  const getUserProfileDetails = async () => {
    const profile = await getUserProfile(username);
    const profiles = await getAllProfiles();
    setUserProfile(profile);
    setAllProfiles(profiles);
    setUserprofilePicture(profile.profile.profilePicture);
    setUserFriendsList(profile.friendsList);
  };

  useEffect(() => {
    getUserProfileDetails();
  }, [username]);

  // useEffect(() => {
  //   const friendsList = userFriendsList.filter((frndList) => {
  //     allProfiles.some(
  //       (profiles) => frndList.friendName === profiles.user.username
  //     );
  //   });

  //   setFriends(friendsList);
  // }, [username]);

  // console.log(friends);
  return (
    <>
      <Profile
        currentUserProfile={userProfile}
        userprofilePicture={userprofilePicture}
        userFriendsList={userFriendsList}
      />
    </>
  );
};

export default UserProfilePage;
