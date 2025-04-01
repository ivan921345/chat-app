import SearchFriendCard from "../SearchFriendCard";
import useFriendsStore from "../../zustand/useFriendsStore";
import SearchFriendSceleton from "../../skeletons/SearchFriendSceleton";
const SearchFriendCardContainer = () => {
  const { foundFriends } = useFriendsStore();

  return (
    <ul
      className={`list h-[30%] m-4 bg-base-100 rounded-box shadow-md overflow-auto ${
        foundFriends.length === 0
          ? "flex justify-evenly"
          : "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5"
      } `}
    >
      {foundFriends.length === 0 ? (
        <>
          <p className="text-2xl">No friends found</p>
          <SearchFriendSceleton />
        </>
      ) : (
        foundFriends.map((foundFriend) => (
          <div key={foundFriend._id}>
            {
              <SearchFriendCard
                profilePic={foundFriend.profilePic}
                email={foundFriend.email}
                friendId={foundFriend._id}
              />
            }
          </div>
        ))
      )}
    </ul>
  );
};

export default SearchFriendCardContainer;
