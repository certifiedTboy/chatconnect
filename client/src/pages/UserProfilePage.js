import React, { useState, useEffect } from "react";
import Profile from "../components/Profile/Profile";
import { useParams } from "react-router-dom";
import { getUserProfile, getAllProfiles } from "../lib/userApi";

const UserProfilePage = () => {
  const params = useParams();
  const { username } = params;

  const [userProfile, setUserProfile] = useState({});
  const [userprofilePicture, setUserprofilePicture] = useState("");
  const [allProfiles, setAllProfiles] = useState([]);
  const [friends, setFriends] = useState([]);
  const getUserProfileDetails = async () => {
    const profile = await getUserProfile(username);
    const profiles = await getAllProfiles();
    setUserProfile(profile);
    setAllProfiles(profiles);
    setUserprofilePicture(profile.profile.profilePicture);
    setFriends(profile.friendsList);
  };

  useEffect(() => {
    getUserProfileDetails();
  }, [username]);

  const listOfFriends = allProfiles.filter((prof) =>
    friends.some((frnd) => prof.user.username === frnd.username)
  );

  return (
    <>
      <Profile
        currentUserProfile={userProfile}
        userprofilePicture={userprofilePicture}
        userFriendsList={listOfFriends}
      />
    </>
  );
};

export default UserProfilePage;
