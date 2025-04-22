import { useEffect } from "react";
import useGroupStore from "../../zustand/useGroupStore";
import GroupCard from "../GroupCard";
import useChatStore from "../../zustand/useChatStore";

const SidebarGroups = () => {
  const { getGroups, groups, isFetchingGroups, setSelectedGroup } =
    useGroupStore();

  const { setSelectedUser } = useChatStore();

  useEffect(() => {
    getGroups();
  }, [getGroups]);

  const handleSetSelectedGroup = (group) => {
    setSelectedGroup(group);
    setSelectedUser(null);
  };

  if (isFetchingGroups) {
    return (
      <div className="flex h-[100%] items-center justify-center">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }

  return groups.map((group) => {
    return (
      <div key={group._id} className="w-[100%]">
        <GroupCard
          group={group}
          handleSetSelectedGroup={handleSetSelectedGroup}
        />
      </div>
    );
  });
};

export default SidebarGroups;
