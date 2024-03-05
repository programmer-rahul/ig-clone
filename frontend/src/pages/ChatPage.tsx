import SideNavBar from "../components/homepage/SideNavBar";
import { useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import AllChatUsersContainer from "../components/chatpage/AllChatUsersContainer";
import ChatContainer from "../components/chatpage/ChatContainer";

const ChatPage = () => {
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;
  }, [socket]);

  return (
    <main>
      <div className={`chatpage h-screen`}>
        <div
          className={`flex h-full flex-col justify-between bg-stone-900 md:flex-row-reverse`}
        >
          <div className="flex h-full w-full lg:border-red-500">
            {/* allChatUsersContainer */}
            <AllChatUsersContainer />

            {/* ChatContainer */}
            <ChatContainer />
          </div>

          {/* sidebar  */}
          <SideNavBar />
        </div>
      </div>
    </main>
  );
};
export default ChatPage;
