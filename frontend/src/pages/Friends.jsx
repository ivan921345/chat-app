import useFriendsStore from "../zustand/useFriendsStore";
import { useEffect } from "react";

const Friends = () => {
  const { friends, fetchFriends } = useFriendsStore();
  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  return (
    <div className="h-screen w-full bg-base-200">
      <div className="flex flex-col items-center"></div>
    </div>
  );
};

export default Friends;
