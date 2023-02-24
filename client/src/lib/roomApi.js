const API_URL = "http://localhost:3001";
// const API_URL = "https://chatconnect-backend-production.up.railway.app"

export const fetchRooms = async () => {
  const token = localStorage.getItem("accessJWT");
  try {
    const response = await fetch(`${API_URL}/rooms`, {
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

export const fetchRoomByTopic = async (topic) => {
  const token = localStorage.getItem("accessJWT");
  try {
    const response = await fetch(`${API_URL}/rooms/${topic}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token": `${token}`,
      },
    });

    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      return response.error;
    }

    return data;
  } catch (error) {
    return error;
  }
};

export const fetchRoomData = async (topic) => {
  const token = localStorage.getItem("accessJWT");
  try {
    const response = await fetch(`${API_URL}/room/room-data/${topic}`, {
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
