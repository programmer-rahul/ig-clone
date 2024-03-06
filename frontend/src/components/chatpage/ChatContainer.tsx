import { useEffect, useRef } from "react";
import { useChat } from "../../context/ChatContext";
import ChatInputBar from "./ChatInputBar";
import { apiHandler } from "../../utils";
import { getAllMessages } from "../../api";
import { useAuth } from "../../context/AuthContext";

const ChatContainer = () => {
  const { selectedChat, selectedChatMessages, setSelectedChatMessages } =
    useChat();
  const { user } = useAuth();

  const bottomScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // fetchUserMessage from server
    const callApi = async () => {
      selectedChat &&
        (await apiHandler(
          () => getAllMessages(selectedChat?._id),
          null,
          (res) => {
            setSelectedChatMessages(res.data.messages);
          },
          (err) => {
            console.log(err);
          },
        ));
    };
    callApi();
  }, [selectedChat]);

  useEffect(() => {
    bottomScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedChatMessages]);

  return (
    <div className="w-full">
      <div className="container relative h-full w-full border border-stone-700 bg-stone-900">
        {selectedChat && (
          <>
            {/* topbar  */}
            <div className="topbar flex h-[7%] items-center justify-start border-b border-stone-700 px-2">
              <div className="profile flex items-center gap-2 text-base font-semibold text-white">
                <img
                  src={selectedChat.avatar.url}
                  alt="user-profile"
                  className="aspect-square max-w-12 rounded-full object-cover lg:max-w-10 xl:max-w-12"
                />
                <p className="fullname">{selectedChat.fullname}</p>
              </div>
            </div>

            {/* chat box  */}
            <div className="chat-box no-scrollbar max-h-[93%] overflow-x-hidden overflow-y-scroll pb-20">
              <div className="selected-chat-profile m-8 flex flex-col items-center gap-1">
                <div className="profile-image">
                  <img
                    src={selectedChat.avatar.url}
                    alt="user-profile"
                    className="aspect-square max-w-20 rounded-full object-cover lg:max-w-16 xl:max-w-24"
                  />
                </div>
                <p className="fullname text-xl text-white">
                  {selectedChat.fullname}
                </p>
                <p className="username text-stone-600">
                  {selectedChat.username}
                </p>
                <button
                  type="button"
                  className="view-profile-btn rounded-md bg-stone-800 px-3 py-1 text-base font-semibold text-white transition-all hover:bg-stone-600"
                >
                  View Profile
                </button>
              </div>
              <div className="messages flex flex-col items-center gap-4 px-2 lg:mt-8">
                {selectedChatMessages?.map((message, index) => {
                  return message.sender === user?._id ? (
                    <ChatMessage
                      isOurMessage={true}
                      content={message.content}
                      key={index}
                    />
                  ) : (
                    <ChatMessage
                      isOurMessage={false}
                      content={message.content}
                      profileSrc={selectedChat.avatar.url}
                      key={index}
                    />
                  );
                })}
                <div ref={bottomScrollRef} />
              </div>
            </div>

            {/* <ChatInputBar /> */}
            <ChatInputBar />
          </>
        )}
      </div>
    </div>
  );
};
export default ChatContainer;

interface ChatMessageInterface {
  content: string;
  isOurMessage?: boolean;
  profileSrc?: string;
}

export const ChatMessage = ({
  content,
  isOurMessage = false,
  profileSrc = "luffy.jpg",
}: ChatMessageInterface) => {
  return (
    <div
      className={`message ${isOurMessage ? "self-end" : "flex items-center gap-2 self-start"}`}
    >
      {!isOurMessage && (
        <div>
          <img
            src={profileSrc}
            alt="selected-user-profile"
            className="aspect-square max-w-8 rounded-full object-cover lg:max-w-6 xl:max-w-8"
          />
        </div>
      )}
      <p className="rounded-full bg-sky-600 px-4 py-1 text-white">{content}</p>
    </div>
  );
};
