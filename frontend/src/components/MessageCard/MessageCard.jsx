const MessageCard = ({
  message,
  handleContextMenu,
  selectedUser,
  authUser,
  messageEndRef,
  activeMessageId,
  menuPosition,
  isContextMenuImageSelected,
  deleteMessage,
  handleCopyMessage,
}) => {
  return (
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
