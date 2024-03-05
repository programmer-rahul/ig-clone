import { useChat } from "../../context/ChatContext";

const ChatInputBar = () => {
  const { userInput, setUserInput } = useChat();

  const sendMessageHandler = () => {
    console.log(userInput);
    if (userInput?.trim() === "") return;
  };

  return (
    <div className="absolute bottom-4 w-full px-4">
      <div className="flex items-center gap-2 rounded-full border border-stone-700 bg-stone-900 px-3 py-2">
        <div className="emoji-icon">
          <img src="smile.svg" alt="emoji" className="w-8" />
        </div>
        <div className="w-full">
          <input
            type="text"
            placeholder="Message..."
            className="w-full border border-none bg-transparent text-white outline-none"
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
          />
        </div>
        <div className="send-file-icon">
          <img src="smile.svg" alt="emoji" className="w-8" />
        </div>
        {userInput?.trim() !== "" && (
          <div>
            <button
              className="text-xl font-semibold text-purple-600 transition-all hover:text-purple-800"
              onClick={sendMessageHandler}
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInputBar;
