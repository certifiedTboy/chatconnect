export const fetchRooms = async () => {
  const token = localStorage.getItem("accessJWT");
  try {
    const response = await fetch("http://localhost:3001/rooms", {
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
    const response = await fetch(`http://localhost:3001/rooms/${topic}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return response.message;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
