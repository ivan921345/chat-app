import { create } from "zustand";
import { Notify } from "notiflix";
import api from "../api";
import useStore from "./useStore";

const useChatStore = create((set, get) => ({
  messages: [],
  selectedUser: null,
  users: [],
  isUsersLoading: false,
  isMessagesLoading: false,
  isSendingMessage: false,
  getUsers: async () => {
    try {
      set({ isUsersLoading: true });
      const res = await api.fetchUsers();
      set({ users: res.data });
    } catch (error) {
      Notify.failure(error.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessages: async (id) => {
    try {
      set({ isMessagesLoading: true });
      const res = await api.fetchMessages(id);
      console.log(res);
      set({ messages: res.data });
    } catch (error) {
      Notify.failure(error.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (data) => {
    try {
      set({ isSendingMessage: true });
      const { selectedUser, messages } = await get();
      const res = await api.sendMessage(selectedUser._id, data);
      console.log(res);
      set({ messages: [...messages, res] });
    } catch (error) {
      Notify.failure(error.message);
    } finally {
      set({ isSendingMessage: false });
    }
  },
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) {
      return;
    }
    const socket = useStore.getState().socket;
    socket.on("sendMessage", (newMessage) => {
      if (newMessage.senderId !== selectedUser._id) {
        return;
      }
      set({ messages: [...get().messages, newMessage] });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useStore.getState().socket;
    socket.off("sendMessage");
  },
  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
  },
}));

export default useChatStore;
