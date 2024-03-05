import ChatInputBar from "./ChatInputBar";

const ChatContainer = () => {
  return (
    <div className="w-full">
      <div className="container relative h-full w-full border border-stone-700 bg-stone-900">
        {/* topbar  */}
        <div className="topbar flex h-[7%] items-center justify-start border-b border-stone-700 px-2">
          <div className="profile flex items-center gap-2 text-base font-semibold text-white">
            <img
              src="luffy.jpg"
              alt="user-profile"
              className="aspect-square max-w-12 rounded-full object-cover lg:max-w-10 xl:max-w-12"
            />
            <p className="fullname">Fullname</p>
          </div>
        </div>

        {/* chat box  */}
        <div className="chat-box no-scrollbar max-h-[93%] overflow-x-hidden overflow-y-scroll pb-20">
          <div className="selected-chat-profile m-8 flex flex-col items-center gap-1">
            <div className="profile-image">
              <img
                src="luffy.jpg"
                alt="user-profile"
                className="aspect-square max-w-20 rounded-full object-cover lg:max-w-16 xl:max-w-24"
              />
            </div>
            <p className="fullname text-xl text-white">Rahul</p>
            <p className="username text-stone-600">rahul262830</p>
            <button
              type="button"
              className="view-profile-btn rounded-md bg-stone-800 px-3 py-1 text-base font-semibold text-white transition-all hover:bg-stone-600"
            >
              View Profile
            </button>
          </div>
          <div className="messages flex flex-col items-center gap-4 px-2 lg:mt-8">
            <ChatMessage />
            <ChatMessage isOurMessage={true} />
            <ChatMessage isOurMessage={true} />
            <ChatMessage />
            <ChatMessage isOurMessage={true} />
            <ChatMessage isOurMessage={true} />
            <ChatMessage isOurMessage={true} />
            <ChatMessage />
            <ChatMessage isOurMessage={true} />
            <ChatMessage />
            <ChatMessage isOurMessage={true} />
            <ChatMessage isOurMessage={true} />
            <ChatMessage isOurMessage={true} />
            <ChatMessage />
            <ChatMessage isOurMessage={true} />
            <ChatMessage />
            <ChatMessage isOurMessage={true} />
            <ChatMessage isOurMessage={true} />
            <ChatMessage isOurMessage={true} />
            <ChatMessage />
            <ChatMessage isOurMessage={true} />
          </div>
        </div>

        {/* <ChatInputBar /> */}
        <ChatInputBar />
      </div>
    </div>
  );
};
export default ChatContainer;

interface ChatMessageInterface {
  isOurMessage?: boolean;
  profileSrc?: string;
}

export const ChatMessage = ({
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
      <p className="rounded-full bg-sky-600 px-4 py-1 text-white">What?</p>
    </div>
  );
};
