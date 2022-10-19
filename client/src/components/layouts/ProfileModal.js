import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import { updateAbout } from "../../lib/userApi";
import {
  pendingRequest,
  successRequest,
  failedRequest,
} from "../Profile/requestRedux/requestSlice";
const ProfileModal = ({ show, onHideModal, currentUserProfile }) => {
  const dispatch = useDispatch();
  // const [show, setShow] = useState(false);
  const [about, setAbout] = useState("");
  const { requestSuccess } = useSelector((state) => state.request);
  const onUpdateUserAbout = async (event) => {
    dispatch(pendingRequest());
    try {
      const response = await updateAbout(about);
      if (response.pending) {
        dispatch(pendingRequest());
      }
      if (response.message === "success") {
        dispatch(successRequest());
        setAbout("");
        onHideModal();
      }
    } catch (error) {
      dispatch(failedRequest());
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
