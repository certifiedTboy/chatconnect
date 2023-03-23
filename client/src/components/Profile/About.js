import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import { useParams } from "react-router-dom";
import { reactToUserAbout } from "../../lib/userApi";
import { OnlineUsers } from "../../lib/OnlineUsers";
import { getUserAbout } from "../../lib/userApi";
import LoadingSpinner from "../UI/LoadingSpinner";

const About = ({ currentUserProfile, userprofilePicture, updateTime }) => {
  const [about, setAbout] = useState(null);
  const [userReact, setUserReact] = useState(false);
  const [reactions, setReactions] = useState([]);
  const [userReaction, setUserReaction] = useState("like");
  const [userAlreadyReacted, setUserAlreadyReacted] = useState(undefined);
  const [aboutInfo, setAboutInfo] = useState("");
  const [userIsActive, setUserIsActive] = useState(false);

  const { requestSuccess, requestLoading } = useSelector(
    (state) => state.request
  );
  const { user, userOnline } = useSelector((state) => state.login);
  const activeUsers = OnlineUsers(user);

  const params = useParams();

  const username = params.username;

  const onGetUserAbout = async () => {
    const response = await getUserAbout(username);
    if (!response || !response.text) {
      return setAboutInfo("");
    }
    setAbout(response);
    setReactions(response.reactions);

    const userReacted = response.reactions.find(
      (reaction) => reaction.username === user
    );
    if (userReacted) {
      setUserAlreadyReacted(true);
    } else {
      setUserAlreadyReacted(false);
    }
  };

  const onReactToUserAbout = async () => {
    const response = await reactToUserAbout(userReaction, about._id);
    if (response.message === "success") {
      setUserReact(true);
    }

    if (response.message === "reaction removed") {
      setUserReact(false);
    }
  };

  useEffect(() => {
    onGetUserAbout();
  }, [userReact, username]);

  useEffect(() => {
    console.log(activeUsers);

    const activeUser = activeUsers.find((user) => user.username === username);

    if (activeUser) {
      setUserIsActive(true);
    } else {
      setUserIsActive(false);
    }
  }, [username]);

  return (
    <>
      {/* {!currentUserProfile.about && <div></div>} */}
      {requestLoading && <LoadingSpinner />}
      {/* {currentUserProfile.about && ( */}
      <div>
        {/* // POST */}
        <div className="shadow bg-white mt-4 rounded-lg h-max">
          {/* POST AUTHOR */}
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex space-x-2 items-center">
              <div className="relative">
                <img
                  src={`http://localhost:3001/${userprofilePicture}`}
                  alt="Profile pict"
                  className="w-10 h-10 rounded-full"
                />
                <span
                  className={`w-3 h-3 rounded-full absolute right-0 top-3/4 border-white border-2 ${
                    user !== username && userIsActive ? `bg-green-500` : ``
                  }`}
                ></span>
              </div>
              <div>
                <div className="font-semibold">{currentUserProfile.name}</div>
                <span className="text-sm text-gray-500">
                  <Moment fromNow>{updateTime}</Moment>
                </span>
              </div>
            </div>
            <div className="w-8 h-8 grid place-items-center text-xl text-gray-500 hover:bg-gray-200 rounded-full cursor-pointer">
              <i className="bx bx-dots-horizontal-rounded"></i>
            </div>
          </div>
          {/* END POST AUTHOR */}

          {/* POST CONTENT */}
          <div className="text-justify px-4" style={{ marginLeft: "50px" }}>
            {aboutInfo && (
              <p className="mb-3">
                <span>{aboutInfo}</span>{" "}
              </p>
            )}
            {about && (
              <div>
                <p className="mb-2">{about.text}</p>

                <button
                  style={{ display: "block", float: "left" }}
                  onClick={onReactToUserAbout}
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill={userAlreadyReacted ? "red" : "grey"}
                      class="bi bi-heart-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                      />
                    </svg>
                  </span>
                </button>
                <p
                  style={{
                    display: "block",
                    float: "right",
                    fontWeight: "700",
                    color: "blue",
                  }}
                >
                  {reactions.length > 1
                    ? `${reactions.length} likes`
                    : `${reactions.length} like`}
                </p>
              </div>
            )}
          </div>

          {/* {about && (
            <div className="py-4 px-4">
              <div
                style={{ width: "90%", marginLeft: "50px" }}
                className="border border-gray-200 border-l-0 border-r-0 py-1"
              >
                <div>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Control
                        onChange={handleAboutChangeHandler}
                        value={about}
                        as="textarea"
                        rows={3}
                        placeholder="Post a comment"
                      />
                    </Form.Group>
                    <Button type="submit">Submit</Button>
                  </Form>
                </div>
              </div>
            </div>
          )} */}
          {/* END POST ACTION */}
        </div>
        {/* // END POST */}
      </div>
      {/* )} */}
    </>
  );
};

export default About;
