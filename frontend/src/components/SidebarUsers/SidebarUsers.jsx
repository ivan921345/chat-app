import { Users } from "lucide-react";
import useGroupStore from "../../zustand/useGroupStore";
const SidebarUsers = ({
  showOnlineOnly,
  setShowOnlineOnly,
  onlineUsers,
  setSelectedUser,
  selectedUser,
  friends,
}) => {
  const { setSelectedGroup } = useGroupStore();

  const filteredUsers = showOnlineOnly
    ? friends.filter((friend) => onlineUsers.includes(friend._id))
    : friends;

  return (
    <>
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={() => setShowOnlineOnly(() => !showOnlineOnly)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">
            ({onlineUsers.length === 0 ? "0" : onlineUsers.length - 1} online)
          </span>
        </div>
      </div>
      <div className="overflow-y-auto w-full py-3">
        <button
          className="w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors "
          type="button"
          onClick={() => {
            setSelectedGroup(null);
            setSelectedUser({
              fullName: "Chatty bot",
              profilePic: "/chat.png",
            });
          }}
        >
          <div className="relative mx-auto lg:mx-0">
            <img
              className="size-12 object-cover rounded-full"
              src="/chat.png"
              alt="chatty bot"
            />
            <span className="absolute top-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
          </div>
          <div className="hidden lg:block text-left min-w-0">
            <div className="font-medium truncate">Chatty bot</div>
            <div className="text-sm text-zinc-400">Online</div>
          </div>
        </button>
        {filteredUsers.map((user) => (
          <button
            type="button"
            key={user._id}
            onClick={() => {
              setSelectedUser(user);
              setSelectedGroup(null);
            }}
            className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${
              selectedUser?._id === user._id
                ? "bg-base-300 ring-1 ring-base-300"
                : ""
            }`}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "avatar.png"}
                alt={`${user.fullName} avatar`}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute top-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
              )}
            </div>
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
      </div>
    </>
  );
};

export default SidebarUsers;
