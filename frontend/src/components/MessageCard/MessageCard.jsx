import useStore from "../../zustand/useStore";
import useChatStore from "../../zustand/useChatStore";
import useGroupStore from "../../zustand/useGroupStore";
import { Notify } from "notiflix";
import { useEffect, useState } from "react";

const MessageCard = ({ message, messageEndRef, deleteMessage }) => {
  const [activeMessageId, setActiveMessageId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [isContextMenuImageSelected, setIsContextMenuImageSelected] =
    useState(false);
  const selectedUser = useChatStore((state) => state.selectedUser);
  const authUser = useStore((state) => state.authUser);
  const selectedGroup = useGroupStore((state) => state.selectedGroup);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isContextMenuOpen]);

  const handleCopyMessage = async (message) => {
    try {
      await navigator.clipboard.writeText(message);
      Notify.success("Message copied to your clipboard");
    } catch (error) {
      Notify.failure("Error while copying message");
      console.log(error);
    }
  };

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

  return (
    <div
      onContextMenu={(event) => handleContextMenu(event, message._id)}
      key={message._id}
      ref={messageEndRef}
      className={`chat relative w-auto break-words ${
        selectedGroup
          ? message.senderId !== authUser.id
            ? "chat-start"
            : "chat-end"
          : message.senderId === selectedUser._id
          ? "chat-start"
          : "chat-end"
      }`}
    >
      <div className="chat-image avatar">
        <div className="size-10 rounded-full border">
          <img
            src={`${
              selectedGroup
                ? message.profilePic || "avatar.png"
                : message.senderId === selectedUser._id
                ? selectedUser.profilePic || "avatar.png"
                : authUser.profilePic || "avatar.png"
            }`}
            alt="avatar"
          />
        </div>
      </div>
      {!selectedGroup && (
        <div className="chat-header mb-1">
          <time className="text-sm opacity-50">
            {message.createdAt.split("T")[0]}
          </time>
        </div>
      )}

      <div className="chat-bubble flex flex-col">
        {selectedGroup
          ? message.imgUrl && (
              <img
                src={`${message.imgUrl}`}
                className="sm:max-w-[200px] rounded-md mb-2"
                alt="image"
              />
            )
          : message.image && (
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
        {selectedGroup
          ? message.voiceMessageUrl && (
              <div className="w-[20%]">
                <audio
                  className=""
                  controls
                  src={message.voiceMessageUrl}
                ></audio>
              </div>
            )
          : message.voiceMessage && (
              <div className="w-[20%]">
                <audio className="" controls src={message.voiceMessage}></audio>
              </div>
            )}
      </div>
      {activeMessageId === message._id && (
        <ul className={`absolute top-${menuPosition.y} left-${menuPosition.x}`}>
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
  );
};

export default MessageCard;
