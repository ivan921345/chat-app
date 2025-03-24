import useFriendsStore from "../zustand/useFriendsStore";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import FriendsIdInput from "../ui/FriendsIdInput";

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
  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

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
          <div className="h-full flex justify-center flex-col items-center">
            <h1 className="mb-10 text-4xl p-4 font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
              You have no friends yet...
            </h1>
            <form
              onSubmit={hadleAddFriendFormSubmit}
              className="w-[100%] flex flex-col mb-4 justify-center items-center"
            >
              <FriendsIdInput
                value={friendsIdInput}
                onChange={handleFindFriendsInputChange}
              />
              <button
                type="submit"
                className="btn w-[100%] btn-outline btn-success rounded-xl"
              >
                {isAddingFriend ? (
                  <span className="loading loading-ring loading-sm"></span>
                ) : (
                  "Add friend"
                )}
              </button>
            </form>
            <div className="flex w-100 flex-col gap-4">
              <div className="skeleton h-32 w-full"></div>
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
          </div>
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
              <div className="flex flex-col items-start justify-end ">
                <h2 className="px-4 py-4">Username: {friend.fullName}</h2>
                <button className="btn btn-outline btn-primary rounded-xl  mt-4">
                  Reveal friends id
                </button>
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
