import React, { useState } from "react";
import { Container, Row, Form, Col } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { uploadImage } from "../lib/userApi";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import "./ProfileUpload.css";

const ProfileUpload = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.login);
  const [image, setImage] = useState();
  const [loading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSelectImage = (e) => {
    setImage(e.target.files[0]);
  };

  const onUploadImage = async () => {
    setIsLoading(true);
    if (!image) {
      setErrorMessage("No Image Selected");
      setIsLoading(false);
      return;
    }
    if (
      image.type !== "image/png" &&
      image.type !== "image/jpg" &&
      image.type !== "image/jpeg"
    ) {
      setErrorMessage("Only images are allowed");
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
      setErrorMessage(error);
    }
  };

  return (
    <Container style={{ marginTop: "200px", marginBottom: "150px" }}>
      <Row>
        <Col md={4}></Col>
        <Col md={4}>
          <label className="text-center">
            <strong> Profile Picture</strong>
            <br /> <br />
            <span style={{ color: "rgb(0, 146, 0)" }}>
              You look safer to chat with when you have a nice profile picture
            </span>{" "}
            <br /> <br />
          </label>
          <div style={{ margin: "0 auto" }}>
            <div id="img-preview">{/* <img src={`${file}`} />; */}</div>
          </div>

          <div className="file-upload-content">
            <div className="text-center">
              <p style={{ color: "red" }} id="para"></p>
            </div>
            <div className="centered">{loading && <LoadingSpinner />}</div>
            <div className="form-group custom-drop-file text-center">
              <input
                type="file"
                className="form-control file"
                id="choose-file"
                accept="image/*"
                name="picss"
                onChange={onSelectImage}
                style={{ width: "150px" }}
                multiple
              />
              <p>Upload Picture</p>
            </div>
            <div className="form-group text-center">
              {" "}
              <br /> <br />
              {errorMessage && <p>{errorMessage}</p>}
              <button
                className="btn btn-success "
                id="display2"
                onClick={onUploadImage}
              >
                Upload
              </button>
            </div>
          </div>
          {/* </form> */}
          <br />
          <br />
          <div className="text-center">
            <p>
              <NavLink to="/rooms">Skip</NavLink> and upload profile picture
              later
            </p>
          </div>
        </Col>
        <Col md={4}></Col>
      </Row>
    </Container>
  );
};

export default ProfileUpload;
