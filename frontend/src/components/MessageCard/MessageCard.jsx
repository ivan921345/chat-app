const MessageCard = ({
  handleContextMenu,
  message,
  messageEndRef,
  selectedUser,
}) => {
  return (
    <div
      onContextMenu={(event) => handleContextMenu(event, message._id)}
      key={message._id}
      ref={messageEndRef}
      className={`chat relative w-auto break-words ${
        message.senderId === selectedUser._id ? "chat-start" : "chat-end"
      }`}
    ></div>
  );
};

export default MessageCard;
