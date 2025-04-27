import useFriendsStore from "../../zustand/useFriendsStore";
import { UserRoundPlus, UserRoundMinus } from "lucide-react";
import useStore from "../../zustand/useStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useGroupStore from "../../zustand/useGroupStore";

const SearchFriendCard = ({
  email,
  profilePic,
  friendId,
  userToDeleteId,
  groupId,
}) => {
  const deleteFriend = useFriendsStore((state) => state.deleteFriend);
  const addFriend = useFriendsStore((state) => state.addFriend);

  const authUser = useStore((state) => state.authUser);
  const friends = useFriendsStore((state) => state.friends);
  const deleteUser = useGroupStore((state) => state.deleteUser);

  const selectedGroup = useGroupStore((state) => state.selectedGroup);

  const navigate = useNavigate();

  useEffect(() => {}, [friends]);

  const hadleDeleteUserFromGroupButtonClick = async () => {
    await deleteUser(userToDeleteId, groupId);
  };

  const handleAddFriendButtonClick = async (id) => {
    await addFriend(id);
    navigate("/");
  };

  return (
    <li className="list-row relative flex list-none w-[100%] mb-3">
      <div className="mr-4">
        <img className="size-10 rounded-full" src={profilePic} />
      </div>
      <div>
        <div>{email}</div>
        <div className="text-xs font-semibold opacity-60">{friendId}</div>
      </div>
      {selectedGroup ? (
        selectedGroup.owner === friendId ? (
          <p className="absolute right-0 top-0">Owner</p>
        ) : (
          <button
            className="btn btn-square btn-ghost"
            onClick={() => hadleDeleteUserFromGroupButtonClick()}
          >
            <UserRoundMinus />
          </button>
        )
      ) : authUser?.friends?.includes(friendId) ? (
        <button
          className="btn btn-square btn-ghost"
          onClick={() => deleteFriend(friendId)}
        >
          <UserRoundMinus />
        </button>
      ) : (
        <button
          className="btn btn-square btn-ghost"
          onClick={() => handleAddFriendButtonClick(friendId)}
        >
          <UserRoundPlus />
        </button>
      )}
    </li>
  );
};

export default SearchFriendCard;
