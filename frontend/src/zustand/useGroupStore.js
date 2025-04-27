import { create } from "zustand";
import api from "../api";
import { Notify } from "notiflix";

const useGroupStore = create((set, get) => ({
  groups: [],
  isFetchingGroups: false,
  selectedGroup: null,
  isDeletingUser: false,
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
  addUser: async (userToAddId, groupId) => {
    try {
      set({ isAddingUser: true });
      const updatedGroup = await api.addUserToGroup(userToAddId, groupId);

      const filteredGroups = get().groups.filter(
        (group) => group._id !== updatedGroup._id
      );

      set({
        groups: [...filteredGroups, updatedGroup],
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
        groups: [...filteredGroups, updatedGroup],
        selectedGroup: updatedGroup,
      });
    } catch (error) {
      Notify.failure(error);
    } finally {
      set({ isDeletingUser: false });
    }
  },
  setSelectedGroup: (group) => {
    set({ selectedGroup: group });
    console.log(get().selectedGroup);
  },
}));

export default useGroupStore;
