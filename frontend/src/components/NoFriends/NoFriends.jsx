import FriendsidInput from "../../ui/FriendsIdInput";

const NoFriends = ({
  hadleAddFriendFormSubmit,
  friendsIdInput,
  handleFindFriendsInputChange,
  isAddingFriend,
}) => {
  return (
    <div className="h-full flex justify-center flex-col items-center">
      <h1 className="mb-10 text-4xl p-4 font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
        You have no friends yet...
      </h1>
      <form
        onSubmit={hadleAddFriendFormSubmit}
        className="w-[100%] flex flex-col mb-4 justify-center items-center"
      >
        <FriendsidInput
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
  );
};

export default NoFriends;
