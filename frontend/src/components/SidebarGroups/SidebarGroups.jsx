import { useEffect } from "react";
import useGroupStore from "../../zustand/useGroupStore";
import GroupCard from "../GroupCard";
import useChatStore from "../../zustand/useChatStore";
import AddGroupModal from "../AddGroupModal/AddGroupModal";

const SidebarGroups = () => {
  const { getGroups, groups, isFetchingGroups, setSelectedGroup } =
    useGroupStore();

  const setSelectedUser = useChatStore((state) => state.setSelectedUser);

  const subsribeForGroupEvents = useGroupStore(
    (state) => state.subsribeForGroupEvents
  );

  useEffect(() => {
    subsribeForGroupEvents();
  }, [subsribeForGroupEvents]);

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

  return (
    <div className="">
      <div className="border-b-2 ">
        <AddGroupModal />
      </div>
      {groups.map((group) => (
        <div key={group._id} className="w-[100%]">
          <GroupCard
            group={group}
            handleSetSelectedGroup={handleSetSelectedGroup}
          />
        </div>
      ))}
    </div>
  );
};

export default SidebarGroups;
