import { useRef, useState } from "react";
import useChatStore from "../../zustand/useChatStore";
import { X, Image, Send, AudioLines, ChurchIcon } from "lucide-react";
import Notiflix from "notiflix";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInput = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { sendMessage, isSendingMessage } = useChatStore();
  const [isRecordingVoiceMessage, setIsRecordingVoiceMessage] = useState(false);
  const chunksRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleimageSelect = (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (!file) return;
    if (!file.type.startsWith("image")) {
      Notiflix.Notify.failure("Please select an image");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
    setSelectedImage(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInput.current) {
      fileInput.current.value = null;
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (!text.trim() && !imagePreview) {
      return;
    }
    formData.append("text", text);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }
    try {
      await sendMessage(formData);

      setText("");
      setImagePreview(null);
      setSelectedImage(null);
      if (fileInput.current) {
        fileInput.current.value = null;
      }
    } catch (error) {
      Notiflix.Notify.failure(error.mesage);
    }
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const formData = new FormData();

    chunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => chunksRef.current.push(e.data);

    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      if (blob.size !== 0) {
        formData.append("voice", blob);
        await sendMessage(formData);
      }
    };

    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;

    setIsRecordingVoiceMessage(true);
  };

  const handleVoiceMessageButtonHold = async (e) => {
    if (e.type === "touchstart") {
      e.preventDefault();
    }
    timeoutRef.current = setTimeout(() => {
      startRecording();
    }, 500);
  };

  const handleVoiceMessageButtonUp = () => {
    if (isRecordingVoiceMessage) {
      setIsRecordingVoiceMessage(false);
      mediaRecorderRef.current?.stop();
      clearTimeout(timeoutRef.current);
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
            className={`flex btn btn-circle ${
              imagePreview ? "text-emerald-400" : "text-zinc-500"
            }`}
            onClick={() => {
              fileInput.current?.click();
            }}
            type="button"
          >
            <Image size={20} />
          </button>
          <button
            onMouseDown={handleVoiceMessageButtonHold}
            onMouseUp={handleVoiceMessageButtonUp}
            onMouseLeave={handleVoiceMessageButtonUp}
            onTouchStart={handleVoiceMessageButtonHold}
            onTouchEnd={handleVoiceMessageButtonUp}
            onTouchCancel={handleVoiceMessageButtonUp}
            className={`${
              isRecordingVoiceMessage
                ? " translate-y-[-20px] scale-120 transition-all bg-emerald-500 rounded-full  animate-pulse"
                : "text-zinc-500"
            }  hover:cursor-pointer transition-all`}
          >
            <AudioLines />
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
