import axios from "axios";

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  const currentUser = JSON.parse(user);
  if (!currentUser) {
    return;
  }
  return currentUser.C_U;
};

export const getCurrentUserFromServer = async () => {
  const token = localStorage.getItem("accessJWT");
  try {
    const response = await fetch("http://localhost:3001/users/currentuser", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token": `${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      return data;
    }
    console.log(typeof data);
    return data.username;
    return data;
  } catch (error) {
    return error;
  }
};

export const getUserProfile = async (username) => {
  const token = localStorage.getItem("accessJWT");
  try {
    const response = await fetch(
      `http://localhost:3001/user/userprofile/${username}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": `${token}`,
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      console.log(data);
      return data.message;
    }
    return data;
  } catch (error) {
    return error;
  }
};

export const getAllProfiles = async () => {
  const token = localStorage.getItem("accessJWT");
  try {
    const response = await fetch(`http://localhost:3001/users/profiles`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      return data.message;
    }
    return data;
  } catch (error) {
    return error;
  }
};

export const uploadImage = async (fileData) => {
  const token = localStorage.getItem("accessJWT");
  let { image } = fileData;
  let { user } = fileData;
  const formData = new FormData();
  formData.append("image", image);
  try {
    const response = await axios.put(
      `http://localhost:3001/user/profile-upload`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${token}`,
        },
      }
    );

    if (!response.ok) {
      return response.status;
    }
    return response.status;
  } catch (error) {
    return error;
  }
};

export const searchUsers = async (searchValue) => {
  const token = localStorage.getItem("accessJWT");
  try {
    const response = await fetch(
      `http://localhost:3001/search/${searchValue}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": `${token}`,
        },
      }
    );
    if (!response.ok) {
      return response.error;
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};
