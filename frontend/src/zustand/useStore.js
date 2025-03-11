import { create } from "zustand";
import authApi from "../api";
import notiflix from "notiflix";

const store = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLogingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await authApi.checkIfUserIsLoggedIn();
      if (!res) {
        set({ authUser: null });
        return;
      }
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in Check Auth", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    try {
      set({ isSigningUp: true });

      const res = authApi.signUp(data);

      notiflix.Notify.success("Account created successfully");

      set({ authUser: res.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isSigningUp: false });
    }
  },
  logout: async () => {
    try {
      const res = authApi.logout();
      set({ authUser: null });
      notiflix.Notify.success("Logged out successfully");
      return res;
    } catch (error) {
      console.log(error);
    }
  },

  login: async (body) => {
    try {
      set({ isLogingIn: true });
      const res = await authApi.login(body);

      if (res) {
        notiflix.Notify.success("Logged in successfully");
      }
      set({ authUser: res.data });

      return res;
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLogingIn: false });
    }
  },
}));

export default store;
