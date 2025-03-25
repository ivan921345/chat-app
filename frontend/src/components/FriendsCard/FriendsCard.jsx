import { CheckCheck, Copy } from "lucide-react";

const FriendsCard = ({
  friend,
  isRevealingFriendsId,
  selectedFriendToCopyId,
  isIdCopied,
  copiedId,
  handleRevealFriendsId,
  handleCopyId,
  deleteFriend,
  isDeletingFriend,
}) => {
  return (
    <div
      key={friend._id}
      className="flex-1 flex justify-between p-6 items-start w-[100%]"
    >
      <img
        src={friend.profilePic || "/avatar.png"}
        alt="avatar"
        className="size-30"
      />

      <div className="flex flex-col items-start justify-end w-[60%]">
        <h2 className="px-4 py-4">Username: {friend.fullName}</h2>

        {!isRevealingFriendsId ? (
          <button
            onClick={() => handleRevealFriendsId(friend._id)}
            className="btn btn-outline btn-primary w-[100%] rounded-xl mt-4"
          >
            Reveal friend's ID
          </button>
        ) : selectedFriendToCopyId === friend._id ? (
          <div className="flex w-[100%] justify-between items-center">
            <label className="input flex">
              <input
                type="text"
                className="w-[100%] flex"
                readOnly
                value={friend._id}
              />
            </label>
            <button
              type="button"
              className={`btn ${
                isIdCopied && copiedId === friend._id ? "bg-green-500" : ""
              }`}
              onClick={() => handleCopyId(friend._id)}
            >
              {isIdCopied && copiedId === friend._id ? (
                <CheckCheck />
              ) : (
                <Copy />
              )}
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleRevealFriendsId(friend._id)}
            className="btn btn-outline btn-primary w-[100%] rounded-xl mt-4"
          >
            Reveal friend's ID
          </button>
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
  );
};

export default FriendsCard;
