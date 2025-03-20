import { create } from "zustand";
import api from "../api";
import { Notify } from "notiflix";

const useFriendsStore = create((set) => ({
  friends: [],
  fetchFriends: async () => {
    try {
      const res = await api.fetchFriends();
      set({ friends: res });
    } catch (error) {
      Notify.failure(error.message);
    }
  },
}));

export default useFriendsStore;
