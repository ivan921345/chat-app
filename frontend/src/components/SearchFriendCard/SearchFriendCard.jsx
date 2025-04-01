import useFriendsStore from "../../zustand/useFriendsStore";
import { UserRoundPlus, UserRoundMinus } from "lucide-react";
import useStore from "../../zustand/useStore";

const SearchFriendCard = ({ email, profilePic, friendId }) => {
  const { addFriend, deleteFriend } = useFriendsStore();
  const { authUser } = useStore();

  return (
    <li className="list-row">
      <div>
        <img className="size-10 rounded-box" src={profilePic} />
      </div>
      <div>
        <div>{email}</div>
        <div className="text-xs font-semibold opacity-60">{friendId}</div>
      </div>
      {authUser?.friends?.includes(friendId) ? (
        <button
          className="btn btn-square btn-ghost"
          onClick={() => deleteFriend(friendId)}
        >
          <UserRoundMinus />
        </button>
      ) : (
        <button
          className="btn btn-square btn-ghost"
          onClick={() => addFriend(friendId)}
        >
          <UserRoundPlus />
        </button>
      )}
    </li>
  );
};

export default SearchFriendCard;
