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
import { uploadImage } from "../../lib/userApi";
import { getUserProfile } from "../../lib/userApi";
import { useDispatch, useSelector } from "react-redux";
import {
  pendingRequest,
  successRequest,
  failedRequest,
} from "./requestRedux/requestSlice";
import { showAboutPage, loadingPage } from "./profileActions";
import { NavLink, useParams } from "react-router-dom";
import classes from "./profile.module.css";
import camera from "../../assets/camera.png";

const ProfileHeader = ({ currentUserProfile, userprofilePicture }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const username = params.username;
  const { user, userOnline } = useSelector((state) => state.login);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [friendInclude, setFriendInclude] = useState(false);
  const [friendIsPending, setFriendIsPending] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [userAlreadySentRequest, setUserAlreadySentRequest] = useState(false);
  const [userMessagingId, setUserMessagingId] = useState("");
  const { requestSuccess } = useSelector((state) => state.request);

  const onSelectFile = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const image = e.target.files[0];
      if (!image) {
        return;
      }

      if (
        image.type !== "image/png" &&
        image.type !== "image/jpg" &&
        image.type !== "image/jpeg"
      ) {
        return;
      }
      let fileData = {
        user,
        image,
      };

      try {
        const response = await uploadImage(fileData);
        setIsLoading(true);
        if (response === 200) {
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

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
    const currentFriendProfile = friends.find(
      (friend) => friend.username === currentUserProfile.username
    );
    setUserMessagingId(currentFriendProfile.messagingId);
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
        {isLoading ? "Loading…" : "Add"}
      </a>
    </li>
  );

  const removeFriendActionButton = (
    <li className="px-3 d-inline font-semibold text-gray-600">
      <a href="#" disabled={isLoading} onClick={removeUserAsFriend}>
        {isLoading ? "Loading…" : "Unfriend"}
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
      {/* <a href="#">Send Message</a>{" "} */}

      <NavLink
        className="text-center text-blue-700 font-semibold"
        to={`/rooms/${userMessagingId}`}
      >
        {" "}
        Message
      </NavLink>
    </li>
  );

  return (
    <div className="col-12">
      <ProfileModal show={showModal} onHideModal={hideModal} />

      <div
        className="row bg-gray-100 md:rounded-bl-lg md:rounded-br-lg
                        bg-gradient-to-b from-gray-100 via-gray-100 to-gray-400"
        style={{ width: "100%", height: "348px" }}
      >
        <div>
          <img
            src={`http://localhost:3001/${userprofilePicture}`}
            className={`rounded-full inset-x-96 border-4 border-white ${classes.profilePicture}`}
          />
          <div className={classes.imgUpload}>
            <img src={camera} />

            <input
              onInput={onSelectFile}
              className="form-control"
              accept="image/*"
              type="file"
              name="picss"
            />
          </div>
        </div>
      </div>

      {/* // INFOS */}
      <div className="flex justify-center flex-col mt-2 mb-3.5">
        <h1
          className="text-center font-bold text-3xl"
          style={{ color: "black" }}
        >
          <strong> {currentUserProfile.name}</strong>
          <p className={classes.profileUsername}>
            ({currentUserProfile.username})
          </p>
        </h1>

        <hr className="full flex self-center w-2/3 mt-2" />
      </div>
      {/* // END INFOS */}
      {/* // TABS */}
      <div className="w-full flex justify-center">
        <div className="flex justify-between mb-2.5">
          <ul className="flex px-5 py-1.5">
            <li className="px-3 font-semibold text-gray-600">
              <a onClick={aboutPage} href="#">
                About
              </a>
            </li>

            <li className="font-semibold text-gray-600">
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
                  Edit bio
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
