import { create } from "zustand";
import api from "../api";
import { Notify } from "notiflix";

const useFriendsStore = create((set) => ({
  friends: [],
  isFetchingFiendsLoading: false,
  isDeletingFriend: false,
  fetchFriends: async () => {
    try {
      set({ isFetchingFiendsLoading: true });
      const res = await api.fetchFriends();
      console.log(res);
      set({ friends: res });
    } catch (error) {
      Notify.failure(error.message);
    } finally {
      set({ isFetchingFiendsLoading: false });
    }
  },
  deleteFriend: async (friendId) => {
    try {
      set({ isDeletingFriend: true });
      const res = await api.deleteFriend(friendId);
      console.log(res);
    } catch (error) {
      Notify.failure(error.message);
    } finally {
      set({ isDeletingFriend: false });
    }
  },
}));

export default useFriendsStore;
