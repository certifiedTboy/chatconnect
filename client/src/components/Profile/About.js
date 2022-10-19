import React, { useState } from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../UI/LoadingSpinner";
// import { commentToAbout } from "../../lib/userApi";
import { format } from "timeago.js";

const About = ({ currentUserProfile, userprofilePicture, updateTime }) => {
  // const [about, setAbout] = useState("");
  const { requestSuccess, requestLoading } = useSelector(
    (state) => state.request
  );
  // const handleAboutChangeHandler = (event) => {
  //   setAbout(event.target.value);
  // };

  // const onPostComment = async (event) => {
  //   event.preventDefault();
  //   const response = await commentToAbout(currentUserProfile.username, about);
  //   console.log(response);
  // };

  return (
    <>
      {!currentUserProfile.about && <div></div>}
      {requestLoading && <LoadingSpinner />}
      {currentUserProfile.about && (
        <div>
          {/* // POST */}
          <div className="shadow bg-white mt-4 rounded-lg h-max">
            {/* POST AUTHOR */}
            <div className="flex items-center justify-between px-4 py-2">
              <div className="flex space-x-2 items-center">
                <div className="relative">
                  <img
                    src={`http://localhost:3001/${userprofilePicture}`}
                    alt="Profile picture"
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="bg-green-500 w-3 h-3 rounded-full absolute right-0 top-3/4 border-white border-2"></span>
                </div>
                <div>
                  <div className="font-semibold">{currentUserProfile.name}</div>
                  <span className="text-sm text-gray-500">
                    {format(updateTime)}
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
              <p>{currentUserProfile.about}</p>
              {/* <div>
                <button>
                  <strong>Like</strong>
                </button>
              </div> */}
            </div>

            <div className="py-4 px-4">
              <div className="border border-gray-200 border-l-0 border-r-0 py-1">
                <div>
                  {/* <Form>
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
                    <Button type="submit" onClick={onPostComment}>
                      Submit
                    </Button>
                  </Form> */}
                </div>
              </div>
            </div>
            {/* END POST ACTION */}
          </div>
          {/* // END POST */}
        </div>
      )}
    </>
  );
};

export default About;
