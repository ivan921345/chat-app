import { create } from "zustand";
import { Notify } from "notiflix";
import api from "../api";
import useStore from "./useStore";
import deepSeekApi from "../api/deepSeekApi";
const useChatStore = create((set, get) => ({
  messages: [],
  selectedUser: null,
  users: [],
  isUsersLoading: false,
  isMessagesLoading: false,
  isSendingMessage: false,
  deepSeekMessages: [],
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
      const { selectedUser, messages } = get();
      const res = await api.sendMessage(selectedUser._id, data);
      set({ messages: [...messages, res] });
    } catch (error) {
      Notify.failure(error.message);
    } finally {
      set({ isSendingMessage: false });
    }
  },
  sendDeepSeekMessage: async (prompt) => {
    try {
      const res = await deepSeekApi.askDeepSeek(prompt);
      set({
        deepSeekMessages: [
          ...get().deepSeekMessages,
          { user: prompt, answer: res.content },
        ],
      });
      console.log(res);
    } catch (error) {
      Notify.failure(error);
    }
  },
  deleteMessage: async (messageId) => {
    try {
      const deletedMessage = await api.deleteMessage(messageId);
      console.log(deletedMessage);
      const filteredMessages = get().messages.filter((message) => {
        return message._id !== deletedMessage._id;
      });

      set({ messages: filteredMessages });
    } catch (error) {
      Notify.failure(error.response.data.message);
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
    socket.on("deleteMessage", (deletedMessage) => {
      console.log(deletedMessage);
      const filteredMessages = get().messages.filter((message) => {
        return message._id !== deletedMessage._id;
      });
      set({ messages: [...filteredMessages] });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useStore.getState().socket;
    socket.off("sendMessage");
  },
  setSelectedUser: (selectedUserValue) => {
    set({ selectedUser: selectedUserValue });
  },
}));

export default useChatStore;
