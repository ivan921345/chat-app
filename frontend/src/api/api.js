import axios from "axios";
axios.defaults.baseURL = "http://localhost:5001/api";
axios.defaults.withCredentials = true;
import notiflix from "notiflix";

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
  try {
    const res = await axios.post("/auth/signup", body);
    return res;
  } catch (error) {
    notiflix.Notify.failure(error.message);

    console.log(error);
  }
};
const logout = async () => {
  try {
    const res = await axios.post("/auth/logout");
    return res;
  } catch (error) {
    notiflix.Notify.failure("somthing went wrong");

    console.log(error);
  }
};
const login = async (body) => {
  try {
    const res = await axios.post("/auth/login", body);
    return res;
  } catch (error) {
    notiflix.Notify.failure(error.message);

    console.log(error);
  }
};

export default {
  checkIfUserIsLoggedIn,
  signUp,
  logout,
  login,
};
