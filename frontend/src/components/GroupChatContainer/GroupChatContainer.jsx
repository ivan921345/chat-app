import useGroupStore from "../../zustand/useGroupStore";
import ChatHeader from "../ChatHeader";
import MessageInput from "../MessageInput";
import MessageCard from "../MessageCard";
import { nanoid } from "nanoid";
import { useEffect, useRef } from "react";
const GroupChatContainer = () => {
  const selectedGroup = useGroupStore((state) => state.selectedGroup);
  const selectedGroupMessages = useGroupStore(
    (state) => state.selectedGroupMessages
  );
  useEffect(() => {
    if (messageEndRef.current && selectedGroupMessages) {
      messageEndRef.current.scrollIntoView();
    }
  }, [selectedGroupMessages]);
  const messageEndRef = useRef(null);
  return (
    <div className="flex flex-col w-[100%]">
      <ChatHeader />
      <div className="h-full overflow-auto">
        {selectedGroupMessages.map((message) => (
          <div key={nanoid()} className="mt-5 ml-5 mr-5">
            <MessageCard message={message} messageEndRef={messageEndRef} />
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};

export default GroupChatContainer;
