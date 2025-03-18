import { create } from "zustand";
import authApi from "../api";
import notiflix from "notiflix";
import { io } from "socket.io-client";

const BASE_BACKEND_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001"
    : "https://chat-app-hy33.onrender.com/";

const store = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLogingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,
  checkAuth: async () => {
    try {
      const res = await authApi.checkIfUserIsLoggedIn();
      if (!res) {
        set({ authUser: null });
        return;
      }
      set({ authUser: res });
      get().connectSocket();
    } catch (error) {
      console.log("Error in Check Auth", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    try {
      set({ isSigningUp: true });

      const res = await authApi.signUp(data);
      console.log(res);
      set({ authUser: res.data });
      get().connectSocket();

      notiflix.Notify.success("Account created successfully");
    } catch (error) {
      notiflix.Notify.failure(error.response.data.message);
      console.log(error);
    } finally {
      set({ isSigningUp: false });
    }
  },
  logout: async () => {
    try {
      const res = await authApi.logout();
      set({ authUser: null });
      notiflix.Notify.success("Logged out successfully");
      get().disconnectSocket();

      return res;
    } catch (error) {
      notiflix.Notify.failure(error.message);
      console.log(error);
    }
  },

  login: async (body) => {
    get().connectSocket();

    try {
      set({ isLogingIn: true });
      const res = await authApi.login(body);

      if (res.data) {
        notiflix.Notify.success("Logged in successfully");
      }
      set({ authUser: res.data });
      get().connectSocket();

      return res;
    } catch (error) {
      notiflix.Notify.failure(error.response.data.message);
      console.log(error);
    } finally {
      set({ isLogingIn: false });
    }
  },

  updateProfile: async (data) => {
    try {
      set({ isUpdatingProfile: true });
      const res = await authApi.changeProfile(data);
      notiflix.Notify.success("Successfully updated profile image");
      console.log(res);
    } catch (error) {
      notiflix.Notify.failure(error.message);
      console.log(error);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser) {
      return;
    }
    console.log(authUser.id);
    const socket = io(BASE_BACKEND_URL, {
      transports: ["websocket"],
      withCredentials: true,
      query: {
        userId: authUser.id,
      },
    });
    socket.connect();
    set({ socket });
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: [...userIds] });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
      set({ socket: null });
    }
  },
}));

export default store;
