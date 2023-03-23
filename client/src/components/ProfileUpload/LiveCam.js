import React, { useState } from "react";
import Webcam from "react-webcam";
import { Button } from "react-bootstrap";

const LiveCam = ({ onPreviewImage, onUploadImage, onCancelButton }) => {
  const [image, setImage] = useState();
  const [hideLiveCam, setHideLiveCam] = useState(false);

  const generateFilename = () => {
    const num = 8;
    let name = "";
    for (let i = 0; i < num; i++) {
      const random = Math.floor(Math.random() * 27);
      name += String.fromCharCode(97 + random);
    }
    return name;
  };

  const cancelButton = () => {
    onCancelButton();
    onPreviewImage("");
  };

  const uploadImage = () => {
    const fileName = generateFilename();

    const trimmedString = image.replace(image, "");
    const imageContent = atob(trimmedString);
    const buffer = new ArrayBuffer(imageContent.length);
    const view = new Uint8Array(buffer);

    for (let n = 0; n < imageContent.length; n++) {
      view[n] = imageContent.charCodeAt(n);
    }
    const type = "image/jpg";
    const blob = new Blob([buffer], { type });

    const newImageData = new File([blob], fileName + ".jpg", {
      lastModified: new Date().getTime(),
      type,
    });

    onUploadImage(newImageData);
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    // console.log(imageSrc);
    setImage(imageSrc);
    onPreviewImage(imageSrc);
    setHideLiveCam(true);
  }, [webcamRef]);

  return (
    <>
      {hideLiveCam === false && (
        <div>
          <Webcam
            imageSmoothing={true}
            audio={false}
            ref={webcamRef}
            height={720}
            screenshotFormat="image/jpeg"
            width={1280}
            videoConstraints={videoConstraints}
          />
          <div className="text-center mt-3 mb-3">
            <button className="image-capture" onClick={capture}></button>
          </div>
        </div>
      )}

      <div className="form-group text-center">
        <Button variant="warning" className="mr-2" onClick={cancelButton}>
          {hideLiveCam === false ? "Cancle" : "Re-take"}
        </Button>
        <buton className="btn btn-success ml-2" onClick={uploadImage}>
          Upload
        </buton>
      </div>
    </>
  );
};

export default LiveCam;
