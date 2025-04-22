import { useEffect, useState } from "react";
import useChatStore from "../../zustand/useChatStore";
import SidebarSkeleton from "../../skeletons/SidebarSkeleton";

import useStore from "../../zustand/useStore";
import useFriendsStore from "../../zustand/useFriendsStore";
import SidebarUsers from "../SidebarUsers/SidebarUsers";
import SidebarGroups from "../SidebarGroups/SidebarGroups";
const Sidebar = () => {
  const { selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { friends, fetchFriends } = useFriendsStore();
  const { onlineUsers } = useStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [isGroupsSelected, setisGroupsSelected] = useState(false);

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  if (isUsersLoading) {
    return <SidebarSkeleton />;
  }

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="tabs tabs-lift w-[100%]">
        <input
          type="radio"
          name="filterTabs"
          className="tab w-[50%]"
          defaultChecked
          onChange={() => setisGroupsSelected(false)}
          aria-label="Users"
        />
        <input
          type="radio"
          name="filterTabs"
          className="tab w-[50%]"
          aria-label="Groups"
          onChange={() => setisGroupsSelected(true)}
        />
      </div>

      {isGroupsSelected ? (
        <SidebarGroups />
      ) : (
        <SidebarUsers
          onlineUsers={onlineUsers}
          friends={friends}
          showOnlineOnly={showOnlineOnly}
          setShowOnlineOnly={setShowOnlineOnly}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      )}
    </aside>
  );
};

export default Sidebar;
