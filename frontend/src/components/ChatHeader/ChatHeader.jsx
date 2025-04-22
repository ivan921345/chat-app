import useStore from "../../zustand/useStore";
import useChatStore from "../../zustand/useChatStore";
import NoSelectedChat from "../NoSelectedChat";
import useGroupStore from "../../zustand/useGroupStore";
import CloseChatButton from "../../ui/CloseChatButton";
import GroupSettingsModal from "../GroupSettingsModal";
const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useStore();

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
              <GroupSettingsModal groupId={selectedGroup._id} />
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
