import axios from "axios";
axios.defaults.baseURL = "http://localhost:5001/api";
axios.defaults.withCredentials = true;

const checkIfUserIsLoggedIn = async () => {
  try {
    const res = await axios.get("/auth/check");
    return res;
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

export default {
  checkIfUserIsLoggedIn,
  signUp,
  logout,
  login,
};
