import axios from "axios";
const DEV_BACKEND_URL = "http://localhost:5001/api";
const api = axios.create({
  baseURL: "https://chat-app-16po.onrender.com/api",
});
const checkIfUserIsLoggedIn = async () => {
  try {
    const res = await api.get("/auth/check", {
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
  const res = await api.post("/auth/signup", body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};
const logout = async () => {
  const res = await api.post(
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
  const res = await api.post("/auth/login", body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};
const changeProfile = async (data) => {
  const res = await api.put("/auth/update-profile", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};

const fetchUsers = async () => {
  const res = await api.get("/messages/users", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return res.data;
};

const fetchMessages = async (id) => {
  const res = await api.get(`/messages/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};
const sendMessage = async (selectedUserId, data) => {
  const res = await api.post(`/messages/send/${selectedUserId}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};
const deleteMessage = async (messageId) => {
  const res = await api.delete(`/messages/delete/${messageId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};

const fetchFriends = async () => {
  const res = await api.get("/friends", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return res.data;
};

const deleteFriend = async (friendId) => {
  const res = await api.delete("/friends/delete", {
    data: { friendId },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return res.data;
};

const addFriend = async (friendId) => {
  const res = await api.post(
    "/friends/add",
    { friendId },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res.data;
};

const searchFriend = async (userCredentials) => {
  const res = await api.post(
    `/friends/search/${userCredentials}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res.data;
};

const getAllGroups = async () => {
  const res = await api.get("/group", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return res.data;
};

const addUserToGroup = async (userToAddId, groupId) => {
  const res = await api.post(
    "/group/add",
    { userToAddId, groupId },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res.data;
};

const deleteUserFromGroup = async (userToDeleteId, groupId) => {
  const res = await api.delete("/group/delete-user", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: { userToDeleteId, groupId },
  });
  return res.data;
};

const createGroup = async (title) => {
  console.log(title);
  const res = await api.post(
    "/group/create",
    { title },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res.data;
};

const deleteGroup = async (groupId) => {
  const res = await api.delete("/group/delete", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: { groupId },
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
  addFriend,
  deleteMessage,
  searchFriend,
  getAllGroups,
  deleteUserFromGroup,
  addUserToGroup,
  createGroup,
  deleteGroup,
};
