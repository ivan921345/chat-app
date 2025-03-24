import useFriendsStore from "../zustand/useFriendsStore";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import FriendsIdInput from "../ui/FriendsIdInput";
import { Notify } from "notiflix";
import NoFriends from "../components/NoFriends";

import { Copy, CheckCheck } from "lucide-react";

const Friends = () => {
  const {
    friends,
    fetchFriends,
    isFetchingFiendsLoading,
    isDeletingFriend,
    deleteFriend,
    addFriend,
    isAddingFriend,
  } = useFriendsStore();
  const [friendsIdInput, setFriendsIdInput] = useState("");
  const [isRevealingFriendsId, setIsRevealingFriendsId] = useState(false);
  const [isIdCopied, setIsIdCopied] = useState(false);

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  const handleCopyId = async (userId) => {
    try {
      await navigator.clipboard.writeText(userId);
      setIsIdCopied(true);
      Notify.success("Friends id was copyed to your clipboard");

      setTimeout(() => {
        setIsIdCopied(false);
      }, 2000);
    } catch (error) {
      Notify.failure("Error while copying id");
      console.log(error);
    }
  };

  const handleFindFriendsInputChange = (e) => {
    setFriendsIdInput(e.target.value);
  };

  const hadleAddFriendFormSubmit = (e) => {
    e.preventDefault();
    addFriend(friendsIdInput);
    fetchFriends();
  };
  if (isFetchingFiendsLoading) {
    return (
      <div className="flex w-[100%] justify-center items-center">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }

  console.log(friends);

  return (
    <div className="flex-1 h-screen flex flex-col items-center justify-center overflow-auto">
      <input type="text" name="" id="" />
      <div
        className={`w-[100%] bg-base-200 h-[90%] rounded-4xl ${
          friends.length === 0
            ? "flex items-center justify-center"
            : "grid grid-cols-1 sm:w-[85%] lg:grid-cols-2 overflow-auto"
        }`}
      >
        {friends.length === 0 ? (
          <NoFriends
            hadleAddFriendFormSubmit={hadleAddFriendFormSubmit}
            friendsIdInput={friendsIdInput}
            isAddingFriend={isAddingFriend}
            handleFindFriendsInputChange={handleFindFriendsInputChange}
          />
        ) : (
          friends.map((friend) => (
            <div
              key={nanoid()}
              className="flex-1 flex justify-between p-6 items-start w-[100%]"
            >
              <img
                src={friend.profilePic ? friend.profilePic : "/avatar.png"}
                alt="avatar"
                className="size-30"
              />
              <div className="flex flex-col items-start justify-end w-[60%]">
                <h2 className="px-4 py-4">Username: {friend.fullName}</h2>
                {!isRevealingFriendsId ? (
                  <button
                    onClick={() =>
                      setIsRevealingFriendsId(() => !isRevealingFriendsId)
                    }
                    className="btn btn-outline btn-primary w-[100%] rounded-xl mt-4"
                  >
                    Reveal friends id
                  </button>
                ) : (
                  <div className="flex w-[100%] justify-between items-center">
                    <label className="input flex ">
                      <input
                        type="input"
                        className="w-[100%] flex 7"
                        readOnly={true}
                        value={friend._id}
                      />
                    </label>
                    <button
                      type="button"
                      className={`btn ${isIdCopied && "bg-green-500"} `}
                      onClick={() => handleCopyId(friend._id)}
                    >
                      {isIdCopied ? <CheckCheck /> : <Copy />}
                    </button>
                  </div>
                )}

                <button
                  className="btn btn-outline btn-error rounded-xl flex w-[100%] justify-center items-center mt-4"
                  disabled={isDeletingFriend}
                  onClick={() => deleteFriend(friend._id)}
                >
                  {isDeletingFriend ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    "Delete Friend"
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Friends;
