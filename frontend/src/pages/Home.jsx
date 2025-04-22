import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoSelectedChat";
import useGroupStore from "../zustand/useGroupStore";
import GroupChatContainer from "../components/GroupChatContainer";
import useChatStore from "../zustand/useChatStore";

const Home = () => {
  const { selectedUser } = useChatStore();
  const { selectedGroup } = useGroupStore();
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20  ">
        <div className="bg-base-100 rounded-lg  shadow-xl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser && !selectedGroup ? (
              <NoChatSelected />
            ) : selectedGroup ? (
              <GroupChatContainer />
            ) : (
              <ChatContainer />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
