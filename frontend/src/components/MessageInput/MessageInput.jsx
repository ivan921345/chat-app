import { useRef, useState } from "react";
import useChatStore from "../../zustand/useChatStore";
import { Image, Send, AudioLines, Mic } from "lucide-react";
import Notiflix from "notiflix";
import ImagePreview from "../ImagePreview";
import useGroupStore from "../../zustand/useGroupStore";

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
  const { sendDeepSeekMessage, selectedUser } = useChatStore();

  const selectedGroup = useGroupStore((state) => state.selectedGroup);
  const sendGroupMessage = useGroupStore((state) => state.sendGroupMessage);

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
    if (selectedUser?.fullName === "Chatty bot") {
      sendDeepSeekMessage(text);
      setText("");
      return;
    }
    const formData = new FormData();
    if (!text.trim() && !imagePreview) {
      return;
    }
    formData.append("text", text);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }
    try {
      if (selectedGroup) {
        await sendGroupMessage(selectedGroup._id, formData);
      }
      if (selectedUser) {
        await sendMessage(formData);
      }

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
        if (selectedGroup) {
          await sendGroupMessage(selectedGroup._id, formData);
          return;
        }
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
        <ImagePreview removeImage={removeImage} imagePreview={imagePreview} />
      )}

      <form className="flex items-center gap-2" onSubmit={handleSendMessage}>
        <div className="flex-1 flex gap-2">
          {!isRecordingVoiceMessage ? (
            <>
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
            </>
          ) : (
            <>
              <div className="w-full border-2 border-zinc-400 rounded-lg h-9">
                <div className="inline-grid m-3 *:[grid-area:1/1]">
                  <div className="status rounded-full status-lg status-error animate-ping"></div>
                  <div className="status rounded-full status-lg status-error"></div>
                </div>
              </div>
            </>
          )}
          <button
            onMouseDown={handleVoiceMessageButtonHold}
            onMouseUp={handleVoiceMessageButtonUp}
            onMouseLeave={handleVoiceMessageButtonUp}
            onTouchStart={handleVoiceMessageButtonHold}
            onTouchEnd={handleVoiceMessageButtonUp}
            onTouchCancel={handleVoiceMessageButtonUp}
            className={`${
              isRecordingVoiceMessage
                ? "translate-y-[-14px] translate-x-[10px] w-[100px] scale-120 transition-all bg-emerald-500 rounded-full text-zinc-50 animate-pulse"
                : "text-zinc-500"
            }  hover:cursor-pointer flex justify-center items-center transition-all mr-1.5`}
          >
            {isRecordingVoiceMessage ? <Mic /> : <AudioLines />}
          </button>
        </div>

        {!isRecordingVoiceMessage ? (
          <button
            type="submit"
            className="btn btn-sm btn-circle"
            disabled={(!text.trim() && !imagePreview) || isSendingMessage}
          >
            <Send size={22} />
          </button>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
};

export default MessageInput;
