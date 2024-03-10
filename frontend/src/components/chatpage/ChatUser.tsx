import { useEffect, useState } from "react";
import { useChat } from "../../context/ChatContext";
import { ChatMessageInterface, ChatUserInterface } from "../../interfaces/chat";

const ChatUser = ({ chatUser }: { chatUser: ChatUserInterface }) => {
  const [unreadMessageCount, setUnreadMessageCount] = useState<
    ChatMessageInterface[] | []
  >([]);
  const [isOnline, setIsOnline] = useState(false);

  const {
    selectedChat,
    setSelectedChat,
    unreadMessages,
    setUnreadMessages,
    onlineUsers,
  } = useChat();

  useEffect(() => {
    const unread = unreadMessages.filter((unreadMessage) => {
      return unreadMessage?.sender === chatUser._id;
    });
    setUnreadMessageCount(unread);
  }, [unreadMessages]);

  useEffect(() => {
    // this is for when user click on unread message user it will remove that message from unread message array
    if (selectedChat?._id === chatUser._id) {
      const newUnreadMessages = unreadMessages.filter(
        (unreadMessage) =>
          !unreadMessageCount.some(
            (message) => message._id == unreadMessage._id,
          ),
      );
      setUnreadMessages(newUnreadMessages);
    }
  }, [selectedChat]);

  useEffect(() => {
    if (onlineUsers.length !== 0) {
      const status = onlineUsers.some((id) => id === chatUser._id);
      setIsOnline(status);
    }
  }, [onlineUsers]);

  return (
    <div
      className={`user flex cursor-pointer items-center justify-center gap-2  rounded-md p-4 transition-all hover:bg-stone-600 lg:flex lg:p-2 ${selectedChat?.username === chatUser.username ? "bg-stone-700" : "bg-stone-900"}`}
      onClick={() => {
        setSelectedChat(chatUser);
      }}
    >
      <div className="profile relative">
        <img
          src={chatUser.avatar?.url}
          alt="user-profile"
          className="aspect-square max-w-16 rounded-full object-cover lg:max-w-14 xl:max-w-16"
        />
        {unreadMessageCount.length !== 0 && (
          <div className="unread-messages-count absolute -right-1 top-0 grid h-6 w-6 place-content-center rounded-md bg-rose-600 text-xl">
            {unreadMessageCount.length}
          </div>
        )}

        <div
          className={`online-status absolute -right-1 bottom-1 grid h-5 w-5 place-content-center rounded-full text-xl ${isOnline ? "bg-green-500" : "bg-rose-800"}`}
        ></div>
      </div>

      <div className="hidden w-full lg:block">
        <div className="font-semibold capitalize text-white">
          <p>{chatUser?.fullname}</p>
        </div>

        <div className="lastmessage relative flex w-full justify-between gap-2 text-stone-500 ">
          <p>this is last message</p>
          <p className="absolute right-0">2m</p>
        </div>
      </div>
    </div>
  );
};
export default ChatUser;
