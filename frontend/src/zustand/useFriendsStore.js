import { create } from "zustand";
import api from "../api";
import { Notify } from "notiflix";
import useChatStore from "../zustand/useChatStore";

const useFriendsStore = create((set) => ({
  friends: [],
  isFetchingFiendsLoading: false,
  isDeletingFriend: false,
  isAddingFriend: false,
  fetchFriends: async () => {
    try {
      set({ isFetchingFiendsLoading: true });
      const res = await api.fetchFriends();
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
      set({ friends: res });
      const { selectedUser, setSelectedUser } = useChatStore.getState();
      console.log(selectedUser);
      if (selectedUser?.id === friendId) {
        setSelectedUser(null);
      }
      console.log(selectedUser);
    } catch (error) {
      Notify.failure(error.message);
    } finally {
      set({ isDeletingFriend: false });
    }
  },
  addFriend: async (friendId) => {
    try {
      set({ isAddingFriend: true });
      const res = await api.addFriend(friendId);
      console.log(res);
      set({ friends: res });
    } catch (error) {
      console.log(error);
      Notify.failure(error.message);
    } finally {
      set({ isAddingFriend: false });
    }
  },
}));

export default useFriendsStore;
