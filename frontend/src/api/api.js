import axios from "axios";
axios.defaults.baseURL =
  import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";
axios.defaults.withCredentials = true;

const checkIfUserIsLoggedIn = async () => {
  try {
    const res = await axios.get("/auth/check");
    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const signUp = async (body) => {
  const res = await axios.post("/auth/signup", body);
  return res.data;
};
const logout = async () => {
  const res = await axios.post("/auth/logout");
  return res.data;
};
const login = async (body) => {
  const res = await axios.post("/auth/login", body);
  return res.data;
};
const changeProfile = async (data) => {
  const res = await axios.put("/auth/update-profile", data);
  return res.data;
};

const fetchUsers = async () => {
  const res = await axios.get("/messages/users");
  return res.data;
};

const fetchMessages = async (id) => {
  const res = await axios.get(`/messages/${id}`);
  return res.data;
};
const sendMessage = async (selectedUserId, data) => {
  const res = await axios.post(`/messages/send/${selectedUserId}`, data);
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
};
