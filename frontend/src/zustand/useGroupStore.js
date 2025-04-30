import { create } from "zustand";
import api from "../api";
import { Notify } from "notiflix";
import useStore from "./useStore";

const useGroupStore = create((set, get) => ({
  groups: [],
  isFetchingGroups: false,
  selectedGroup: null,
  isDeletingUser: false,

  isDeletingGroup: false,

  isAddingUser: false,
  getGroups: async () => {
    try {
      set({ isFetchingGroups: true });
      const res = await api.getAllGroups();
      console.log(res);
      set({ groups: [...res] });
    } catch (error) {
      Notify.failure(error);
    } finally {
      set({ isFetchingGroups: false });
    }
  },
  deleteGroup: async (groupId) => {
    try {
      set({ isDeletingGroup: true });
      const deletedGroup = await api.deleteGroup(groupId);

      const filteredGroups = get().groups.filter(
        (group) => group._id !== deletedGroup._id
      );

      set({ groups: filteredGroups });
    } catch (error) {
      Notify.failure(error?.response?.body?.message);
    } finally {
      set({ isDeletingGroup: false });
    }
  },
  createGroup: async (title) => {
    try {
      const createdGroup = await api.createGroup(title);

      set({ groups: [createdGroup, ...get().groups] });
    } catch (error) {
      Notify.failure(error);
    }
  },
  addUser: async (userToAddId, groupId) => {
    try {
      set({ isAddingUser: true });
      const updatedGroup = await api.addUserToGroup(userToAddId, groupId);

      const filteredGroups = get().groups.filter(
        (group) => group._id !== updatedGroup._id
      );

      set({
        groups: [updatedGroup, ...filteredGroups],
        selectedGroup: updatedGroup,
      });
    } catch (error) {
      Notify.failure(error.response.body.message);
    } finally {
      set({ isAddingUser: false });
    }
  },
  deleteUser: async (userToDeleteId, groupId) => {
    try {
      set({ isDeletingUser: true });

      const updatedGroup = await api.deleteUserFromGroup(
        userToDeleteId,
        groupId
      );

      const filteredGroups = get().groups.filter(
        (group) => group._id !== updatedGroup._id
      );

      set({
        groups: [updatedGroup, ...filteredGroups],
        selectedGroup: updatedGroup,
      });
    } catch (error) {
      Notify.failure(error);
    } finally {
      set({ isDeletingUser: false });
    }
  },
  subsribeForGroupEvents: () => {
    const socket = useStore.getState().socket;
    socket.on("addUser", (updatedGroup) => {
      const filteredGroups = get().groups.filter(
        (group) => group._id !== updatedGroup._id
      );
      console.log("filteredGroups :", filteredGroups);
      set({ groups: [updatedGroup, ...filteredGroups] });
    });
    socket.on("deleteUser", (updatedGroup) => {
      // проблема, когда юзер залогинен с другого акка даже так удаляеться грпуппа у ВСЕХ кроме админа
      const filteredGroups = get().groups.filter(
        (group) => group._id !== updatedGroup._id
      );
      get().getGroups();
      set({ groups: [...filteredGroups] });
    });
  },
  unsubsribeFromGroupEvents: () => {
    const socket = useStore.getState().socket;
    socket.off("addUser");
    socket.off("deleteUser");
  },
  setSelectedGroup: (group) => {
    set({ selectedGroup: group });
  },
}));

export default useGroupStore;
