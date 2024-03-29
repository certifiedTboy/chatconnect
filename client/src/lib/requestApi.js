const API_URL = "http://localhost:3001"
// const API_URL = "https://chatconnect-backend-production.up.railway.app"

export const sendRequest = async (receiverUsername) => {
  const token = localStorage.getItem("accessJWT");
  const user = localStorage.getItem("user");
  const newUser = JSON.parse(user);

  const senderUsername = newUser.C_U;
  console.log(senderUsername);
  const data = {
    senderUsername,
    receiverUsername,
  };
  const response = await fetch(`${API_URL}/user/requests`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "auth-token": `${token}`,
    },
  });

  try {
    const data = await response.json();
    if (!response.ok) {
      return data;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  const token = localStorage.getItem("accessJWT");
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token": `${token}`,
      },
    });
    if (!response.ok) {
      return response.message;
    }
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const acceptRequest = async (requestSenderName) => {
  const token = localStorage.getItem("accessJWT");
  const user = localStorage.getItem("user");
  const newUser = JSON.parse(user);
  const currentUser = newUser.C_U;
  const data = {
    currentUser,
    requestSenderName,
  };

  const response = await fetch(
    `${API_URL}/user/requests/acceptrequest`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token": `${token}`,
      },
    }
  );

  try {
    const data = await response.json();
    if (!response.ok) {
      return data;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const cancelRequest = async (requestSenderName) => {
  const token = localStorage.getItem("accessJWT");
  const user = localStorage.getItem("user");
  const newUser = JSON.parse(user);
  const currentUser = newUser.C_U;
  const data = {
    currentUser,
    requestSenderName,
  };

  const response = await fetch(
    `${API_URL}/user/requests/cancelrequest`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token": `${token}`,
      },
    }
  );

  try {
    const data = await response.json();
    if (!response.ok) {
      return data;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const removeFriend = async (friendUsername) => {
  const token = localStorage.getItem("accessJWT");
  const user = localStorage.getItem("user");
  const newUser = JSON.parse(user);
  const userUsername = newUser.C_U;
  const data = {
    userUsername,
    friendUsername,
  };

  const response = await fetch(
    `${API_URL}/user/requests/removefriend`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token": `${token}`,
      },
    }
  );

  try {
    const data = await response.json();
    if (!response.ok) {
      return data;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUserFriends = async () => {
  const token = localStorage.getItem("accessJWT");
  const user = localStorage.getItem("user");
  const username = JSON.parse(user);
  const response = await fetch(
    `${API_URL}/user/request/${username.C_U}/allFriends`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token": `${token}`,
      },
    }
  );

  try {
    const data = await response.json();
    if (!response.ok) {
      return data;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserSentRequest = async (username) => {
  const token = localStorage.getItem("accessJWT");

  const response = await fetch(
    `${API_URL}/user/request/${username}/sentrequests`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token": `${token}`,
      },
    }
  );

  try {
    const data = await response.json();
    if (!response.ok) {
      return data;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserRequests = async (username) => {
  const token = localStorage.getItem("accessJWT");

  const response = await fetch(
    `${API_URL}/user/request/${username}/requests`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token": `${token}`,
      },
    }
  );

  try {
    const data = await response.json();
    if (!response.ok) {
      return data;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};
