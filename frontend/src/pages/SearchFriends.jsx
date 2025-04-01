import FriendsIdInput from "../ui/FriendsIdInput";
import { useState } from "react";
import useFriendsStore from "../zustand/useFriendsStore";
const SearchFriends = () => {
  const { isSearchingFriends, searchFriend } = useFriendsStore();
  const [searchFriendInputValue, setSearchFriendInputValue] = useState("");

  const handleSearchFriends = (e) => {
    e.preventdefault();
    searchFriend(isSearchingFriends);
  };

  const handleSearchFriendInputValue = (e) => {
    setSearchFriendInputValue(e.target.value);
  };
  return (
    <div className="h-screen flex flex-col justify-center items-center w-full">
      <div
        className={`py-20 bg-accent shadow-lg shadow-neutral backdrop-blur-xl border border-white/30 shadow-lg rounded-xl p-6 w-[100%]  sm:w-[50%] h-[50%]`}
      >
        <form onSubmit={handleSearchFriends}>
          <FriendsIdInput
            value={searchFriendInputValue}
            onChange={handleSearchFriendInputValue}
          />
          <button type="submit" className="btn btn-active btn-success w-[100%]">
            Search friends
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchFriends;
