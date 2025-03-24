import { useEffect, useRef, useState } from "react";
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

  const [activeMessageId, setActiveMessageId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

  const messageEndRef = useRef(null);

  const { authUser } = useStore();

  const handleContextMenu = (event, messageId) => {
    event.preventDefault();
    setMenuPosition({ x: event.pageX, y: event.pageY });
    console.log(menuPosition.y);
    setActiveMessageId(messageId);
    setIsContextMenuOpen(true);
  };

  const handleClickOutside = () => {
    setIsContextMenuOpen(false);
    setActiveMessageId(null);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isContextMenuOpen]);

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
      <div className="flex w-[100%] justify-center items-center">
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
            onContextMenu={(event) => handleContextMenu(event, message._id)}
            key={message._id}
            ref={messageEndRef}
            className={`chat relative ${
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
            {activeMessageId === message._id && (
              <ul
                className={`absolute top-${menuPosition.y} left-${menuPosition.x}`}
              >
                <button type="button" className="btn btn-rounded">
                  Copy
                </button>
                <button type="button" className="btn btn-rounded">
                  Delete
                </button>
                <button type="button" className="btn btn-rounded">
                  Change
                </button>
              </ul>
            )}
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
