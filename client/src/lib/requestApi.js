export const sendRequest = async (receiverUsername) => {
  const token = localStorage.getItem("accessJWT");
  const user = localStorage.getItem("user");
  const newUser = JSON.parse(user);
  const senderUsername = newUser.username;
  const data = {
    senderUsername,
    receiverUsername,
  };
  const response = await fetch(`http://localhost:3001/user/requests`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
    const response = await fetch("http://localhost:3001/users", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

export const acceptRequest = async (requestSender) => {
  const user = localStorage.getItem("user");
  const newUser = JSON.parse(user);
  const currentUser = newUser.username;
  const data = {
    currentUser,
    requestSender,
  };
  const response = await fetch(
    `http://localhost:3001/user/requests/acceptrequest`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
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
// export const acceptRequest = async () => {
//   const token = localStorage.getItem("accessJWT")

//   try {
//  const response = await fetch ("http://localhost:3001/user/request")

//   }catch(error){

//   }
//  }
