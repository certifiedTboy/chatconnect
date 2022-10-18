import React, { useState, useEffect } from "react";
import ProfileModal from "../layouts/ProfileModal";
import {
  sendRequest,
  getUserSentRequest,
  removeFriend,
  getAllUserFriends,
  cancelRequest,
  getUserRequests,
} from "../../lib/requestApi";
import { getUserProfile } from "../../lib/userApi";
import { useDispatch, useSelector } from "react-redux";
import {
  pendingRequest,
  successRequest,
  failedRequest,
} from "./requestRedux/requestSlice";
import { showAboutPage, loadingPage } from "./profileActions";
import Button from "react-bootstrap/Button";
import { Link, useParams } from "react-router-dom";

const ProfileHeader = ({ currentUserProfile, userprofilePicture }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const username = params.username;
  const { user } = useSelector((state) => state.login);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [friendInclude, setFriendInclude] = useState(false);
  const [friendIsPending, setFriendIsPending] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [userAlreadySentRequest, setUserAlreadySentRequest] = useState(false);
  const { requestSuccess } = useSelector((state) => state.request);

  const onShowModal = () => {
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  const removeUserAsFriend = async () => {
    setIsLoading(true);
    const response = await removeFriend(currentUserProfile.username);
    if (response.pending) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    if (response.message === "success") {
      const friends = await getAllUserFriends();
      const userIsFriend = friends.find(
        (friend) => friend.username === currentUserProfile.username
      );
      if (!userIsFriend) {
        setFriendInclude(false);
        setFriendIsPending(false);
        dispatch(successRequest());
      }
    }
  };

  const sendFriendRequest = async () => {
    setIsLoading(true);
    const response = await sendRequest(currentUserProfile.username);
    if (response.pending) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      dispatch(successRequest());
    }

    if (response.ok) {
      setFriendIsPending(true);
    }
  };

  const onGetUserFriends = async () => {
    const friends = await getAllUserFriends();
    const userIsFriend = friends.find(
      (friend) => friend.username === currentUserProfile.username
    );
    if (userIsFriend) {
      setFriendInclude(true);
      setFriendIsPending(false);
    }
  };

  const onGetSentRequest = async () => {
    const sentRequest = await getUserSentRequest(user);

    if (sentRequest.userRequest.length >= 1) {
      const userRequest = sentRequest.userRequest.find(
        (req) => req.username === currentUserProfile.username
      );
      if (userRequest.username === currentUserProfile.username) {
        setFriendIsPending(true);
      }
    }
  };

  const onCancelRequest = async () => {
    const response = await cancelRequest(username);

    if (response.message === "success") {
      const sentRequest = await getUserSentRequest(user);
      if (sentRequest.userRequest || []) {
        const userRequestExist = sentRequest.userRequest.find(
          (req) => req.username === currentUserProfile.username
        );

        if (!userRequestExist) {
          setFriendIsPending(false);
          dispatch(successRequest());
        }
      }
    }
  };

  const onGetUserRequests = async () => {
    try {
      const userRequest = await getUserRequests(username);
      if (userRequest.length > 0) {
        const userBelongsToRequest = userRequest.find(
          (request) => request.username === user
        );
        if (userBelongsToRequest) {
          setUserAlreadySentRequest(true);
        }
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    onGetUserFriends();
    onGetSentRequest();
    onGetUserRequests();
  }, [
    username,
    onGetUserFriends,
    sendFriendRequest,
    removeUserAsFriend,
    onCancelRequest,
    onGetUserRequests,
    requestSuccess,
  ]);

  const aboutPage = async () => {
    dispatch(loadingPage());
    try {
      const response = await getUserProfile();
      if (response.pending) {
        dispatch(loadingPage());
      }
      if (response) {
        dispatch(showAboutPage());
      }
    } catch (error) {}
  };

  const handleMouseOver = async () => {
    setIsHovering(true);
  };

  const handleMouseOut = async () => {
    setIsHovering(false);
  };

  const addFriendActionButton = (
    <li className="px-3 d-inline font-semibold text-gray-600">
      <a href="#" disabled={isLoading} onClick={sendFriendRequest}>
        {isLoading ? "Loading…" : "Add Friend"}
      </a>
    </li>
  );

  const removeFriendActionButton = (
    <li className="px-3 d-inline font-semibold text-gray-600">
      <a href="#" disabled={isLoading} onClick={removeUserAsFriend}>
        {isLoading ? "Loading…" : "Remove Friend"}
      </a>
    </li>
  );

  const pendingFriendActionButton = (
    <li className="px-3 d-inline font-semibold text-gray-600">
      <a
        href="#"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={onCancelRequest}
      >
        {isHovering ? "Cancel Request" : "Request Pending..."}
      </a>{" "}
    </li>
  );

  const sendMessageLink = (
    <li className="px-3 d-inline font-semibold text-gray-600">
      <a href="#">Send Message</a>{" "}
    </li>
  );

  return (
    <>
      <ProfileModal
        show={showModal}
        onHideModal={hideModal}
        currentUserProfile={currentUserProfile}
      />
      <div>
        <div
          className=" w-full flex justify-center w-200"
          style={{ height: "348px" }}
        >
          <div className="flex flex-col">
            <div
              className="md:relative bg-gray-100 md:rounded-bl-lg md:rounded-br-lg
                        bg-gradient-to-b from-gray-100 via-gray-100 to-gray-400"
              style={{ width: "940px", height: "348px" }}
            >
              {/* // cover photo */}
              <div className="">
                {/* profile photo */}
                <div>
                  <img
                    src={`http://localhost:3001/${userprofilePicture}`}
                    className="rounded-full md:absolute top-48 inset-x-96 border-4 border-white w-40 h-40"
                    style={{ width: "168px", height: "168px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* // INFOS */}
        <div className="flex justify-center flex-col mt-5 mb-3.5">
          <h1 className="text-center font-bold text-3xl">
            <strong> {currentUserProfile.name}</strong>(
            {currentUserProfile.username})
          </h1>
          <a href="#" className="text-center text-blue-700 font-semibold">
            Add Bio
          </a>
          <hr className="full flex self-center w-2/3 mt-2" />
        </div>
        {/* // END INFOS */}
        {/* // TABS */}
        <div className="w-full flex justify-center">
          <div className="flex justify-between mb-2.5">
            <ul className="flex px-5 py-1.5">
              {/* <li className="px-3 font-semibold text-gray-600">
              <a href="#">Posts</a>
            </li> */}
              <li className="px-3 font-semibold text-gray-600">
                <a onClick={aboutPage} href="#">
                  About
                </a>
              </li>

              <li className="px-3 font-semibold text-gray-600">
                <a href="#">Photos</a>
              </li>

              <li className="px-3 font-semibold text-gray-600">
                {user === username && ""}
                {user !== username &&
                  friendIsPending === false &&
                  friendInclude === false &&
                  addFriendActionButton}
                {user !== username &&
                  friendIsPending === true &&
                  friendInclude === false &&
                  pendingFriendActionButton}

                {user !== username &&
                  friendInclude === true &&
                  friendIsPending === false &&
                  removeFriendActionButton}

                {user !== username &&
                  friendInclude === true &&
                  friendIsPending === false &&
                  sendMessageLink}
              </li>
            </ul>
            <ul className="flex mb:pl-14">
              {user === params.username && (
                <li className="px-2 font-semibold">
                  <button
                    className="bg-gray-200 px-5 py-1 rounded-lg text-black font-semibold"
                    onClick={onShowModal}
                  >
                    <i className="bx bx-edit-alt mr-2 text-xl"></i>
                    Edit Profile
                  </button>
                </li>
              )}
              {/* <li className="px-2 font-semibold">
                <button className="bg-gray-200 px-3 py-1 rounded-lg text-black font-semibold">
                  ...
                </button>
              </li> */}
            </ul>
          </div>
        </div>
        {/* // END TABS */}
      </div>
    </>
  );
};

export default ProfileHeader;
