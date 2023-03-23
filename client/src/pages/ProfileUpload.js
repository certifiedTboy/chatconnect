import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { uploadImage } from "../lib/userApi";
import ImageUpload from "../components/ProfileUpload/ImageUpload";
import LiveCam from "../components/ProfileUpload/LiveCam";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import "./ProfileUpload.css";

const ProfileUpload = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.login);
  const [prevImage, setPrevImage] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [toggleUploadMethod, setToggleUploadMethod] = useState();
  const [hideButton, setHideButton] = useState(false);

  const selectLiveCamUploadMethod = () => {
    setHideButton(true);
    setToggleUploadMethod(false);
  };
  const selectImageUploadMethod = () => {
    setHideButton(true);
    setToggleUploadMethod(true);
  };

  const onCancelButton = () => {
    setHideButton(false);
    setToggleUploadMethod();
    setErrorMessage("");
  };

  const onPreviewImage = (image) => {
    setPrevImage(image);
  };

  const onUploadImage = async (image) => {
    setIsLoading(true);
    if (!image) {
      setErrorMessage("Please select an image");
      setIsLoading(false);
      return;
    }
    if (
      image.type !== "image/png" &&
      image.type !== "image/jpg" &&
      image.type !== "image/jpeg"
    ) {
      setErrorMessage("Only images are allowed");
      setIsLoading(false);
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
        setIsLoading(false);
        navigate("/rooms");
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error);
    }
  };

  return (
    <Container className="file-upload-main">
      <Row>
        <Col md={4}></Col>
        <Col md={4}>
          <label className="text-center">
            <strong> Profile Picture</strong>
            <br /> <br />
            <span>
              You look safer to chat with when you have a nice profile picture
            </span>{" "}
            {/* <br /> <br /> */}
          </label>
          <div className="image-upload">
            {prevImage && (
              <img
                className={`rounded-full inset-x-96 border-4 border-green`}
                src={prevImage}
                alt="file to be uploaded"
              />
            )}
          </div>

          <div className="file-upload-content">
            <div className="text-center">
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
            <div className="centered">{loading && <LoadingSpinner />}</div>

            <div>
              {toggleUploadMethod === false && (
                <LiveCam
                  onPreviewImage={onPreviewImage}
                  onUploadImage={onUploadImage}
                  onCancelButton={onCancelButton}
                />
              )}
              {toggleUploadMethod === true && (
                <ImageUpload
                  onPreviewImage={onPreviewImage}
                  onUploadImage={onUploadImage}
                  onCancelButton={onCancelButton}
                />
              )}
            </div>
          </div>
          {hideButton === false && (
            <div className="text-center">
              <button
                onClick={selectLiveCamUploadMethod}
                className="btn btn-success"
              >
                Live Cam
              </button>{" "}
              <button
                onClick={selectImageUploadMethod}
                className="btn btn-success"
              >
                Image Upload
              </button>
            </div>
          )}
          {/* </form> */}
          <br />
          <br />
          <div className="text-center">
            <p>
              <NavLink className={`upload-link`} to="/rooms">
                Skip
              </NavLink>{" "}
              to upload profile picture later
            </p>
          </div>
        </Col>
        <Col md={4}></Col>
      </Row>
    </Container>
  );
};

export default ProfileUpload;
