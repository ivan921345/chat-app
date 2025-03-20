import axios from "axios";
axios.defaults.baseURL = "https://chat-app-16po.onrender.com/api";

const checkIfUserIsLoggedIn = async () => {
  try {
    const res = await axios.get("/auth/check", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const signUp = async (body) => {
  const res = await axios.post("/auth/signup", body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};
const logout = async () => {
  const res = await axios.post(
    "/auth/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res.data;
};
const login = async (body) => {
  const res = await axios.post("/auth/login", body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};
const changeProfile = async (data) => {
  const res = await axios.put("/auth/update-profile", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};

const fetchUsers = async () => {
  const res = await axios.get("/messages/users", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return res.data;
};

const fetchMessages = async (id) => {
  const res = await axios.get(`/messages/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};
const sendMessage = async (selectedUserId, data) => {
  const res = await axios.post(`/messages/send/${selectedUserId}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};

const fetchFriends = async () => {
  const res = await axios.get("/friends", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return res.data;
};

const deleteFriend = async (friendId) => {
  const res = await axios.delete("/friends/delete", friendId, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return res.data;
};
export default {
  checkIfUserIsLoggedIn,
  signUp,
  logout,
  login,
  changeProfile,
  fetchUsers,
  fetchMessages,
  sendMessage,
  fetchFriends,
  deleteFriend,
};
