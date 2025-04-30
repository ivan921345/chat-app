import { EllipsisVertical } from "lucide-react";
import SearchFriendCard from "../SearchFriendCard";
import useGroupStore from "../../zustand/useGroupStore";
import UsernameInput from "../../ui/UsernameInput";
import { UserRoundPlus } from "lucide-react";
import { useState } from "react";

const GroupSettingsModal = ({
  groupId,
  addUserInputValue,
  onAddUserInputChange,
  filteredFriendsToAdd,
}) => {
  const selectedGroup = useGroupStore((state) => state.selectedGroup);
  const addUser = useGroupStore((state) => state.addUser);
  const deleteGroup = useGroupStore((state) => state.deleteGroup);
  const isDeletingGroup = useGroupStore((state) => state.isDeletingGroup);

  const [userToAddId, setUserToAddId] = useState(null);

  const handleAddUserToGroupClick = async (userToAddId, groupId) => {
    await addUser(userToAddId, groupId);
    setUserToAddId(userToAddId);

    setTimeout(() => {
      setUserToAddId(null);
    }, 2000);
  };

  return (
    <>
      <button
        className="btn mr-3"
        onClick={() => document.getElementById("groupSettingModal").showModal()}
      >
        <EllipsisVertical />
      </button>
      <dialog id="groupSettingModal" className="modal">
        <div className="modal-box bg-base-300 rounded-2xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="tabs tabs-lift">
            <label className="tab">
              <input type="radio" name="settingsGroupTabs" defaultChecked />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-users-icon lucide-users size-5 mr-2"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Users
            </label>
            <div className="tab-content bg-base-100 border-base-300 p-6 overflow-auto">
              {selectedGroup.users.map((user) => (
                <div className="flex w-[100%]" key={user._id}>
                  <SearchFriendCard
                    email={user.email}
                    profilePic={user.profilePic}
                    friendId={user._id}
                    userToDeleteId={user._id}
                    groupId={groupId}
                  />
                </div>
              ))}
            </div>

            <label className="tab">
              <input type="radio" name="settingsGroupTabs" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-settings-icon lucide-settings size-5 mr-2"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Settings
            </label>
            <div className="tab-content bg-base-100 border-base-300 p-6">
              <div className="mb-3 flex justify-between">
                <button
                  onClick={() => {
                    document.getElementById("groupSettingModal").close();
                    deleteGroup(selectedGroup._id);
                  }}
                  className="btn btn-outline btn-error rounded-xl"
                  disabled={isDeletingGroup}
                >
                  {isDeletingGroup ? (
                    <span className="loading loading-ring loading-md"></span>
                  ) : (
                    "Delete group"
                  )}
                </button>
                <button className="btn btn-outline btn-secondary rounded-xl">
                  Rename group
                </button>
              </div>

              <UsernameInput
                value={addUserInputValue}
                onChange={onAddUserInputChange}
              />

              <div className="">
                {filteredFriendsToAdd.map((filteredFriend) => (
                  <div key={filteredFriend._id} className="m-5">
                    {/* <SearchFriendCard
                      email={filteredFriend.email}
                      profilePic={filteredFriend.profilePic}
                      friendId={filteredFriend._id}
                      filteredFriendToDeleteId={filteredFriend._id}
                      groupId={groupId}
                    /> */}

                    <div className="flex border-b-2 pb-2">
                      <img
                        src={filteredFriend.profilePic || "/avatar.png"}
                        alt=""
                        className="size-12"
                      />
                      <div className="flex justify-between ml-4 w-[100%]">
                        <p className="text-gray-400">
                          {filteredFriend.fullName}
                        </p>
                        <button
                          disabled={userToAddId}
                          className={`hover:cursor-pointer rounded-md ${
                            userToAddId === filteredFriend._id
                              ? "bg-green-500"
                              : ""
                          }`}
                          onClick={() =>
                            handleAddUserToGroupClick(
                              filteredFriend._id,
                              selectedGroup._id
                            )
                          }
                        >
                          {userToAddId === filteredFriend._id ? (
                            "Added"
                          ) : (
                            <UserRoundPlus />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default GroupSettingsModal;
