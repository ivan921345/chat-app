import { useEffect, useRef } from "react";
import useChatStore from "../../zustand/useChatStore";
import ChatHeader from "../ChatHeader";
import MessageInput from "../MessageInput";
import MessageCard from "../MessageCard";
const ChatContainer = () => {
  const messages = useChatStore((state) => state.messages);
  const deleteMessage = useChatStore((state) => state.deleteMessage);
  const getMessages = useChatStore((state) => state.getMessages);
  const isMessagesLoading = useChatStore((state) => state.isMessagesLoading);
  const selectedUser = useChatStore((state) => state.selectedUser);

  const subscribeToMessages = useChatStore(
    (state) => state.subscribeToMessages
  );
  const unsubscribeFromMessages = useChatStore(
    (state) => state.unsubscribeFromMessages
  );
  const deepSeekMessages = useChatStore((state) => state.deepSeekMessages);

  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser.fullName === "Chatty bot") {
      return;
    }
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => {
      unsubscribeFromMessages();
    };
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
    selectedUser.fullName,
  ]);
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView();
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex w-[100%] justify-center items-center">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {selectedUser.fullName === "Chatty bot" ? (
          <div className="chat">
            {deepSeekMessages.map((deepSeekMessage) => (
              <>
                <div className="chat chat-end mb-3 p-3">
                  <p className="chat-bubble">{deepSeekMessage.user}</p>
                </div>
                <div className="chat chat-start mb-3 p-3">
                  <p className="chat-bubble">{deepSeekMessage.answer}</p>
                </div>
              </>
            ))}
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div key={message._id}>
                <MessageCard
                  message={message}
                  deleteMessage={deleteMessage}
                  messageEndRef={messageEndRef}
                />
              </div>
            ))}
          </>
        )}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
