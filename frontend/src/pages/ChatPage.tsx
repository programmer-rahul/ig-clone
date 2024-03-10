import SideNavBar from "../components/homepage/SideNavBar";
import { useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import AllChatUsersContainer from "../components/chatpage/AllChatUsersContainer";
import ChatContainer from "../components/chatpage/ChatContainer";
import { ChatMessageInterface } from "../interfaces/chat";
import { useChat } from "../context/ChatContext";

const ChatPage = () => {
  const { socket } = useSocket();
  const {
    setSelectedChatMessages,
    selectedChat,
    setUnreadMessages,
    setOnlineUsers,
  } = useChat();

  const onMessageReceive = (receivedMessage: ChatMessageInterface) => {
    if (selectedChat?._id === receivedMessage.sender) {
      setSelectedChatMessages((prev) => {
        return [...prev, receivedMessage];
      });
    } else {
      setUnreadMessages((prev) => {
        return [...prev, receivedMessage];
      });
    }
  };

  const onOnlineUser = (onlineUsers: string[]) => {
    setOnlineUsers(onlineUsers);
  };

  useEffect(() => {
    if (!socket) return;

    socket?.on("receive-message", onMessageReceive);
    socket?.on("found-online-users", onOnlineUser);

    return () => {
      socket.off("receive-message", onMessageReceive);
    };
  }, [socket, selectedChat]);

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
