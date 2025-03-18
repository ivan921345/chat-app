import { useEffect, useRef } from "react";
import useChatStore from "../../zustand/useChatStore";
import ChatHeader from "../ChatHeader";
import MessageInput from "../MessageInput";
import useStore from "../../zustand/useStore";
const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const messageEndRef = useRef(null);

  const { authUser } = useStore();

  useEffect(() => {
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
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            ref={messageEndRef}
            className={`chat ${
              message.senderId === selectedUser._id ? "chat-start" : "chat-end"
            }`}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={`${
                    message.senderId === selectedUser._id
                      ? selectedUser.profilePic || "avatar.png"
                      : authUser.profilePic || "avatar.png"
                  }`}
                  alt="avatar"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-sm opacity-50">
                {message.createdAt.split("T")[0]}
              </time>
            </div>

            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={`${message.image}`}
                  className="sm:max-w-[200px] rounded-md mb-2"
                  alt="image"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
