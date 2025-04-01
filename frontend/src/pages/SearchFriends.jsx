import FriendsIdInput from "../ui/FriendsIdInput";
import { useState } from "react";
import useFriendsStore from "../zustand/useFriendsStore";
import SearchFriendCardContainer from "../components/SearchFriendCardContainer";
const SearchFriends = () => {
  const { isSearchingFriends, searchFriend } = useFriendsStore();
  const [searchFriendInputValue, setSearchFriendInputValue] = useState("");

  const handleSearchFriends = (e) => {
    e.preventDefault();
    searchFriend(searchFriendInputValue);
  };

  const handleSearchFriendInputValue = (e) => {
    setSearchFriendInputValue(e.target.value);
  };
  return (
    <div className="h-screen flex flex-col justify-center items-center w-full">
      <div
        className={`py-20 bg-accent shadow-neutral backdrop-blur-xl border border-white/30 shadow-lg rounded-xl p-6 w-[100%]  sm:w-[50%] h-[50%]`}
      >
        <form onSubmit={handleSearchFriends}>
          <FriendsIdInput
            value={searchFriendInputValue}
            onChange={handleSearchFriendInputValue}
          />
          <button
            disabled={isSearchingFriends}
            type="submit"
            className="btn btn-active btn-success w-[100%] rounded-2xl hover:bg-base-200 shadow-lg"
          >
            {isSearchingFriends ? (
              <span className="loading loading-ring loading-lg"></span>
            ) : (
              "Search friends"
            )}
          </button>
        </form>
      </div>
      <SearchFriendCardContainer />
    </div>
  );
};

export default SearchFriends;
