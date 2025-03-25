import { useState } from "react";
import useFriendsStore from "../../zustand/useFriendsStore";
import FriendsCard from "../FriendsCard";
import { Notify } from "notiflix";

const FriendsContainer = ({ friends }) => {
  const [isRevealingFriendsId, setIsRevealingFriendsId] = useState(false);
  const [isIdCopied, setIsIdCopied] = useState(false);
  const [copiedId, setCopiedId] = useState("");
  const [selectedFriendToCopyId, setSelectedFriendToCopyId] = useState("");
  const { isDeletingFriend, deleteFriend } = useFriendsStore();

  const handleRevealFriendsId = (frindsId) => {
    setIsRevealingFriendsId(() => !isRevealingFriendsId);
    console.log(frindsId);
    setSelectedFriendToCopyId(frindsId);
  };

  const handleCopyId = async (userId) => {
    try {
      await navigator.clipboard.writeText(userId);
      setIsIdCopied(true);
      setCopiedId(userId);
      Notify.success("Friends id was copyed to your clipboard");

      setTimeout(() => {
        setIsIdCopied(false);
      }, 2000);
    } catch (error) {
      Notify.failure("Error while copying id");
      console.log(error);
    }
  };

  return friends.map((friend) => (
    <div key={friend._id}>
      <FriendsCard
        friend={friend}
        isRevealingFriendsId={isRevealingFriendsId}
        selectedFriendToCopyId={selectedFriendToCopyId}
        isIdCopied={isIdCopied}
        copiedId={copiedId}
        handleRevealFriendsId={handleRevealFriendsId}
        handleCopyId={handleCopyId}
        deleteFriend={deleteFriend}
        isDeletingFriend={isDeletingFriend}
      />
    </div>
  ));
};

export default FriendsContainer;
