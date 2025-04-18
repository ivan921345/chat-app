import { useEffect, useRef, useState } from "react";
import useChatStore from "../../zustand/useChatStore";
import ChatHeader from "../ChatHeader";
import MessageInput from "../MessageInput";
import useStore from "../../zustand/useStore";
import { Notify } from "notiflix";
const ChatContainer = () => {
  const {
    messages,
    deleteMessage,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const [activeMessageId, setActiveMessageId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [isContextMenuImageSelected, setIsContextMenuImageSelected] =
    useState(false);
  const messageEndRef = useRef(null);
  const { authUser } = useStore();

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isContextMenuOpen]);

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

  const handleContextMenu = (event, messageId) => {
    event.preventDefault();
    if (event.target.nodeName === "IMG") {
      setIsContextMenuImageSelected(true);
      setMenuPosition({ x: event.pageX, y: event.pageY });
      setActiveMessageId(messageId);
      setIsContextMenuOpen(true);
      return;
    }
    setIsContextMenuImageSelected(false);
    setMenuPosition({ x: event.pageX, y: event.pageY });
    setActiveMessageId(messageId);
    setIsContextMenuOpen(true);
  };

  const handleClickOutside = () => {
    setIsContextMenuOpen(false);
    setActiveMessageId(null);
  };

  const handleCopyMessage = async (message) => {
    try {
      await navigator.clipboard.writeText(message);
      Notify.success("Message copied to your clipboard");
    } catch (error) {
      Notify.failure("Error while copying message");
      console.log(error);
    }
  };

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
            className={`chat relative w-auto break-words ${
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
              {message.text &&
                (message.text.startsWith("https://") ? (
                  <a
                    href={message.text}
                    className="text-[0.9rem] text-blue-600 underline sm:text-lg"
                    target="_blank"
                  >
                    {message.text}
                  </a>
                ) : (
                  <p className="text-[0.9rem] sm:text-lg">{message.text}</p>
                ))}
              {message.voiceMessage && (
                <div className="w-[20%]">
                  <audio
                    className=""
                    controls
                    src={message.voiceMessage}
                  ></audio>
                </div>
              )}
            </div>
            {activeMessageId === message._id && (
              <ul
                className={`absolute top-${menuPosition.y} left-${menuPosition.x}`}
              >
                {isContextMenuImageSelected ? (
                  <>
                    <button
                      onClick={() => handleCopyMessage(message.text)}
                      type="button"
                      className="btn btn-rounded"
                    >
                      Copy
                    </button>
                    <button
                      onClick={() => deleteMessage(message._id)}
                      type="button"
                      className="btn btn-rounded"
                    >
                      Delete
                    </button>
                    <button type="button" className="btn btn-rounded">
                      Change
                    </button>
                    <button type="button" className="btn btn-rounded">
                      Download
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleCopyMessage(message.text)}
                      type="button"
                      className="btn btn-rounded"
                    >
                      Copy
                    </button>
                    <button
                      onClick={() => deleteMessage(message._id)}
                      type="button"
                      className="btn btn-rounded"
                    >
                      Delete
                    </button>
                    <button type="button" className="btn btn-rounded">
                      Change
                    </button>
                  </>
                )}
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
