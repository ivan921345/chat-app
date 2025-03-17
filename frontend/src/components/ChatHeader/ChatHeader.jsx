import { X } from "lucide-react";
import useStore from "../../zustand/useStore";
import useChatStore from "../../zustand/useChatStore";
import { CircleX } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
              />
            </div>
          </div>

          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <button
          className="hover:cursor-pointer"
          onClick={() => setSelectedUser(null)}
        >
          <CircleX />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
