import { CircleX } from "lucide-react";

const CloseChatButton = ({ handleCloseChat }) => {
  return (
    <button className="hover:cursor-pointer" onClick={handleCloseChat}>
      <CircleX />
    </button>
  );
};

export default CloseChatButton;
