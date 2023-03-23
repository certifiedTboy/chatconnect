import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {updateUserAbout} from "../../lib/userApi"
import LoadingSpinner from "../UI/LoadingSpinner"

const ProfileModal = ({ show, onHideModal }) => {
  const [about, setAbout] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const aboutChangeHandler = (event) => {
    setAbout(event.target.value);
  };

  const handleClose = () => {
    onHideModal();
  };

  const onUpdateUserAbout = async () => {
    const userAboutData = {
      text:about
    }
    setIsLoading(true)
    
    try{
      const response = await updateUserAbout(userAboutData);
      if(response.error){
        setIsLoading(false)
        setErrorMessage(response.error)
      }
      if(response.message === "success"){
        setIsLoading(false)
        handleClose()
      }

    }catch(error){
setErrorMessage("something went wrong")
    }
   
    }
  

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <strong> Write about yourself </strong>
          </Modal.Title>
        </Modal.Header>
        {isLoading && <div style={{margin:"10px auto"}}>
        <LoadingSpinner/>
        </div>}
        
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>About</Form.Label>
              <Form.Control
                onChange={aboutChangeHandler}
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
