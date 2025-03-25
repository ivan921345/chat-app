import useFriendsStore from "../zustand/useFriendsStore";
import { useEffect, useState } from "react";
import NoFriends from "../components/NoFriends";
import FriendsContainer from "../components/FriendsContainer";

const Friends = () => {
  const {
    isAddingFriend,
    friends,
    fetchFriends,
    isFetchingFiendsLoading,
    addFriend,
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
          <NoFriends
            hadleAddFriendFormSubmit={hadleAddFriendFormSubmit}
            friendsIdInput={friendsIdInput}
            isAddingFriend={isAddingFriend}
            handleFindFriendsInputChange={handleFindFriendsInputChange}
          />
        ) : (
          <FriendsContainer friends={friends} />
        )}
      </div>
    </div>
  );
};

export default Friends;
