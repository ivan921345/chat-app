import axios from "axios";
const DEV_BACKEND_URL = "http://localhost:5001/api";
const api = axios.create({
  baseURL: "https://chat-app-16po.onrender.com/api",
});

const askDeepSeek = async (prompt) => {
  const res = await api.post(
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
