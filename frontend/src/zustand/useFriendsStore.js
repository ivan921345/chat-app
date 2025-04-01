import { create } from "zustand";
import api from "../api";
import { Notify } from "notiflix";
import useChatStore from "../zustand/useChatStore";

const useFriendsStore = create((set, get) => ({
  friends: [],
  isFetchingFiendsLoading: false,
  isDeletingFriend: false,
  isAddingFriend: false,
  isSearchingFriends: false,
  foundFriends: [],
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
      if (selectedUser?._id === friendId) {
        setSelectedUser(null);
      }
    } catch (error) {
      Notify.failure(error.response.data.message);
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
      Notify.failure(error.response.data.message);
    } finally {
      set({ isAddingFriend: false });
    }
  },
  searchFriend: async (userCredentials) => {
    try {
      set({ isSearchingFriends: true });
      const res = await api.searchFriend(userCredentials);
      set({ foundFriends: res });
      console.log(get().foundFriends);
    } catch (error) {
      Notify.failure(error?.response?.body?.message ?? "uncougth error");
    } finally {
      set({ isSearchingFriends: false });
    }
  },
}));

export default useFriendsStore;
