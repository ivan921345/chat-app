import useFriendsStore from "../../zustand/useFriendsStore";
import { UserRoundPlus } from "lucide-react";

const SearchFriendCard = ({ email, profilePic, friendId }) => {
  const { addFriend } = useFriendsStore();

  return (
    <li className="list-row">
      <div>
        <img className="size-10 rounded-box" src={profilePic} />
      </div>
      <div>
        <div>{email}</div>
        <div className="text-xs font-semibold opacity-60">{friendId}</div>
      </div>
      <button
        className="btn btn-square btn-ghost"
        onClick={() => addFriend(friendId)}
      >
        <UserRoundPlus />
      </button>
    </li>
  );
};

export default SearchFriendCard;
