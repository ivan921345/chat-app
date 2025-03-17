import { useRef, useState } from "react";
import useChatStore from "../../zustand/useChatStore";
import { X, Image, Send } from "lucide-react";
import Notiflix from "notiflix";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInput = useRef(null);
  const { sendMessage, isSendingMessage } = useChatStore();

  const handleimageSelect = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file.type.startsWith("image")) {
      Notiflix.Notify.failure("Please select an image");
      return;
    }
    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInput.current) {
      fileInput.current.value = null;
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!text.trim() && !imagePreview) {
      return;
    }

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);
      if (fileInput.current) {
        fileInput.current.value = null;
      }
    } catch (error) {
      Notiflix.Notify.failure(error.mesage);
    }
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form className="flex items-center gap-2" onSubmit={handleSendMessage}>
        <div className="flex-1 flex gap-2">
          <input
            placeholder="Type a message..."
            type="text"
            name="messageInput"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
          />
          <input
            type="file"
            name="file"
            accept="image/*"
            className="hidden"
            ref={fileInput}
            onChange={handleimageSelect}
          />
          <button
            className={`hidden sm:flex btn btn-circle ${
              imagePreview ? "text-emerald-400" : "text-zinc-500"
            }`}
            onClick={() => {
              fileInput.current?.click();
            }}
            type="button"
          >
            <Image size={20} />
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={(!text.trim() && !imagePreview) || isSendingMessage}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
