import { useEffect } from "react";
import useGroupStore from "../../zustand/useGroupStore";
import ChatHeader from "../ChatHeader";
import MessageInput from "../MessageInput";
const GroupChatContainer = () => {
  const { selectedGroup, setSelectedGroup } = useGroupStore();
  //   useEffect(() => {
  //     return () => {
  //       setSelectedGroup(null);
  //     };
  //   }, [setSelectedGroup]);

  return (
    <div className="flex flex-col w-[100%]">
      <ChatHeader />
      <div className="h-full">
        {selectedGroup.messages.map((message) => (
          <p>message</p>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};

export default GroupChatContainer;
