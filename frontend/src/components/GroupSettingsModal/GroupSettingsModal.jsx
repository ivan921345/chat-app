import { EllipsisVertical } from "lucide-react";
import SearchFriendCard from "../SearchFriendCard";
import useGroupStore from "../../zustand/useGroupStore";

const GroupSettingsModal = ({ groupId }) => {
  const selectedGroup = useGroupStore((state) => state.selectedGroup);

  return (
    <>
      <button
        className="btn mr-3"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        <EllipsisVertical />
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-base-300">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="tabs tabs-lift">
            <label className="tab">
              <input type="radio" name="my_tabs_4" defaultChecked />
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
              <input type="radio" name="my_tabs_4" />
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
              Tab content 2
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default GroupSettingsModal;
