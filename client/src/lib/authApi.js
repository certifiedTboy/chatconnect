const API_URL = "http://localhost:3001";
// const API_URL = "https://chatconnect-backend-production.up.railway.app"

// user login API
export const userLogin = async (data) => {
  const response = await fetch(`${API_URL}/signin`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  try {
    const data = await response.json();
    if (!response.ok) {
      return data;
    }
    if (data.error) {
      return data;
    }
    localStorage.setItem("accessJWT", data.token);
    localStorage.setItem("user", JSON.stringify(data.userData));
    return data;
  } catch (error) {
    return error;
  }
};

//userRegisteration API
export const userRegisteration = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      return data;
    }
    return data;
  } catch (error) {
    return error;
  }
};

//User Logout Api
export const logoutUser = async () => {
  try {
    const response = await fetch(`${API_URL}/signout`, {
      method: "GET",
    });
    const data = await response.json();
    if (!response.ok) {
      return data;
    }
    localStorage.removeItem("user");
    localStorage.removeItem("accessJWT");
    return data;
  } catch (error) {
    return error;
  }
};

export const requestPasswordRest = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/reset-password-request`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
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
    return error;
  }
};

export const verifyPasswordToken = async (tokenData) => {
  try {
    const response = await fetch(`${API_URL}/verify-token`, {
      method: "POST",
      body: JSON.stringify(tokenData),
      headers: {
        "Content-Type": "application/json",
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
  } catch (error) {}
};

export const setNewPassword = async (passwordData) => {
  try {
    const response = await fetch(`${API_URL}/reset-password`, {
      method: "POST",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
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
  } catch (error) {}
};
