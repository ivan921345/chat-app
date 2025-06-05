import axios from "axios";
const DEV_BACKEND_URL = "http://localhost:5001/api";
axios.defaults.baseURL = DEV_BACKEND_URL;
// ""https://chat-app-16po.onrender.com""

const askDeepSeek = async (prompt) => {
  const res = await axios.post(
    "/ai/ask",
    { prompt },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res.data;
};

export default { askDeepSeek };
