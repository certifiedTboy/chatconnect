import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { updateAbout } from "../../lib/userApi";
const ProfileModal = ({ show, onHideModal, currentUserProfile }) => {
  // const [show, setShow] = useState(false);
  const [about, setAbout] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onUpdateUserAbout = async (event) => {
    setIsLoading(true);
    try {
      const response = await updateAbout(about);
      if (response.message === "success") {
        setIsLoading(false);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAboutChangeHandler = (event) => {
    setAbout(event.target.value);
  };

  const handleClose = () => {
    onHideModal();
  };
  // const handleShow = () => setShow(true);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <strong> Edit Profile </strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Account Name</Form.Label>
              <Form.Control
                defaultValue={currentUserProfile.name}
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username</Form.Label>
              <Form.Control
                defaultValue={currentUserProfile.username}
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                defaultValue={currentUserProfile.phoneNumber}
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>About</Form.Label>
              <Form.Control
                onChange={handleAboutChangeHandler}
                value={about}
                as="textarea"
                rows={6}
                placeholder="Write Briefly About Yourself..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onUpdateUserAbout}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileModal;
