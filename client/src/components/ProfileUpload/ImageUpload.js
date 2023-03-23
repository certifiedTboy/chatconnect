import React, { useState } from "react";

const ImageUpload = ({ onPreviewImage, onUploadImage, onCancelButton }) => {
  const [image, setImage] = useState();

  const onSelectFile = (event) => {
    const onLoadFn = (dataURL) => {
      //   setPrevImage(dataURL);
      onPreviewImage(dataURL);
    };

    if (event.target.files && event.target.files.length > 0) {
      //   setErrorMessage("");
      const reader = new FileReader();
      reader.addEventListener("load", () => onLoadFn(reader.result));
      reader.readAsDataURL(event.target.files[0]);
      setImage(event.target.files[0]);
    }
  };

  const uploadImage = (event) => {
    onUploadImage(image);
  };

  const cancelButton = () => {
    onPreviewImage("");
    onCancelButton();
  };

  return (
    <div>
      <div className="form-group custom-drop-file text-center">
        <input
          type="file"
          className="form-control file"
          id="choose-file"
          accept="image/*"
          onInput={onSelectFile}
          style={{ width: "150px" }}
          multiple
        />
        <p className="upload-label">Upload Picture</p>
      </div>
      <div className="form-group text-center">
        {" "}
        <br /> <br />
        <button
          className="btn btn-warning mr-2"
          id="display2"
          onClick={cancelButton}
        >
          Cancel
        </button>
        <button
          className="btn btn-success ml-2"
          id="display2"
          onClick={uploadImage}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;
