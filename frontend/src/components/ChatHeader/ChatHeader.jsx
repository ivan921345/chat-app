import useStore from "../../zustand/useStore";
import useChatStore from "../../zustand/useChatStore";
import NoSelectedChat from "../NoSelectedChat";
import useGroupStore from "../../zustand/useGroupStore";
import CloseChatButton from "../../ui/CloseChatButton";
import GroupSettingsModal from "../GroupSettingsModal";
import useFriendsStore from "../../zustand/useFriendsStore";
import { useEffect } from "react";

import { useState } from "react";
const ChatHeader = () => {
  const selectedUser = useChatStore((state) => state.selectedUser);
  const setSelectedUser = useChatStore((state) => state.setSelectedUser);

  const friends = useFriendsStore((state) => state.friends);

  const onlineUsers = useStore((state) => state.onlineUsers);

  const [addUserInputValue, setAddUserInputValue] = useState("");
  const [filteredFriendsToAdd, setFilteredFriendsToAdd] = useState([]);

  useEffect(() => {
    const filteredFriends = friends.filter((friend) =>
      friend.fullName.toLowerCase().includes(addUserInputValue.toLowerCase())
    );
    setFilteredFriendsToAdd(filteredFriends);
  }, [addUserInputValue, friends]);

  const onAddUserInputChange = (e) => {
    setAddUserInputValue(e.target.value);
  };

  const { selectedGroup, setSelectedGroup } = useGroupStore();

  if (!selectedUser && !selectedGroup) {
    return <NoSelectedChat />;
  }

  const handleCloseChat = () => {
    setSelectedUser(null);
    setSelectedGroup(null);
  };

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        {selectedGroup ? (
          <>
            <div className="flex">
              {selectedGroup.users.map((user) => (
                <p key={user._id} className="mr-2">
                  {user.fullName}
                </p>
              ))}
            </div>
            <div className="flex items-center">
              <GroupSettingsModal
                groupId={selectedGroup._id}
                onAddUserInputChange={onAddUserInputChange}
                addUserInputValue={addUserInputValue}
                filteredFriendsToAdd={filteredFriendsToAdd}
              />
              <CloseChatButton handleCloseChat={handleCloseChat} />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="size-10 rounded-full relative">
                  <img
                    src={selectedUser.profilePic || "avatar.png"}
                    alt={selectedUser.fullName}
                  />
                </div>
              </div>

              <div>
                <h3 className="font-medium">{selectedUser.fullName}</h3>
                {selectedUser.fullName === "Chatty bot" ? (
                  <p className="text-sm text-base-content/70">Online</p>
                ) : (
                  <p className="text-sm text-base-content/70">
                    {onlineUsers.includes(selectedUser._id)
                      ? "Online"
                      : "Offline"}
                  </p>
                )}
              </div>
            </div>
            <CloseChatButton handleCloseChat={handleCloseChat} />
          </>
        )}
      </div>
    </div>
  );
};
export default ChatHeader;
