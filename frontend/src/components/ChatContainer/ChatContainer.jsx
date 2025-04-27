import { useEffect, useRef, useState } from "react";
import useChatStore from "../../zustand/useChatStore";
import ChatHeader from "../ChatHeader";
import MessageInput from "../MessageInput";
import useStore from "../../zustand/useStore";
import { Notify } from "notiflix";
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
  console.log(deepSeekMessages);
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
                  handleContextMenu={handleContextMenu}
                  handleCopyMessage={handleCopyMessage}
                  authUser={authUser}
                  menuPosition={menuPosition}
                  isContextMenuImageSelected={isContextMenuImageSelected}
                  deleteMessage={deleteMessage}
                  activeMessageId={activeMessageId}
                  selectedUser={selectedUser}
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
