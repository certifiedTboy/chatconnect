import axios from "axios";

const API_URL = "http://localhost:3001";
// const API_URL = "https://chatconnect-backend-production.up.railway.app"

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
    const response = await fetch(`${API_URL}/users/currentuser`, {
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

    return data.username;
    // return data;
  } catch (error) {
    return error;
  }
};

export const getUserProfile = async (username) => {
  const token = localStorage.getItem("accessJWT");
  try {
    const response = await fetch(`${API_URL}/user/userprofile/${username}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token": `${token}`,
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

export const getAllProfiles = async () => {
  const token = localStorage.getItem("accessJWT");
  try {
    const response = await fetch(`${API_URL}/users/profiles`, {
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
  const formData = new FormData();
  formData.append("image", image);
  try {
    const response = await axios.put(
      `${API_URL}/user/profile-upload`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
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

export const updateUserAbout = async (aboutData) => {
  const token = localStorage.getItem("accessJWT");
  try {
    const response = await fetch(`${API_URL}/about`, {
      method: "POST",
      body: JSON.stringify(aboutData),
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

    if (data.error) {
      return data;
    }

    return data;
  } catch (error) {
    return { error: "something when" };
  }
};

export const getUserAbout = async (username) => {
  const token = localStorage.getItem("accessJWT");
  try {
    const response = await fetch(`${API_URL}/about/${username}`, {
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
    if (data.error) {
      return data;
    }

    return data.userAbout;
  } catch (error) {
    return { error: "something went wrong" };
  }
};

export const reactToUserAbout = async (reaction, aboutId) => {
  const token = localStorage.getItem("accessJWT");
  const reactionData = {
    reaction,
  };
  try {
    const response = await fetch(`${API_URL}/about/${aboutId}`, {
      method: "POST",
      body: JSON.stringify(reactionData),
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
    if (response.error) {
      return data;
    }
    return data;
  } catch (error) {
    return { error: "something went wrong" };
  }
};
// export const commentToAbout = async (username, text) => {
//   const token = localStorage.getItem("accessJWT");
//   const commentData = {
//     text,
//   };
//   console.log(commentData);
//   try {
//     const response = await fetch(
//       `http://localhost:3001/users/profile/about/${username}/comment`,
//       {
//         method: "POST",
//         body: JSON.stringify(commentData),
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           "auth-token": `${token}`,
//         },
//       }
//     );
//     const data = await response.json();
//     if (!response.ok) {
//       throw new Error(data.error);
//     }
//     return data;
//   } catch (error) {
//     return error;
//   }
// };

export const searchUsers = async (searchValue) => {
  const token = localStorage.getItem("accessJWT");
  try {
    const response = await fetch(`${API_URL}/search/${searchValue}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token": `${token}`,
      },
    });
    if (!response.ok) {
      return response.error;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
