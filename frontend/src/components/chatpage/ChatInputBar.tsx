import { addNewMessage } from "../../api";
import { useChat } from "../../context/ChatContext";
import { ChatMessageInterface } from "../../interfaces/chat";
import { apiHandler } from "../../utils";

const ChatInputBar = () => {
  const { userInput, setUserInput, selectedChat, setSelectedChatMessages } =
    useChat();

  const sendMessageHandler = async () => {
    if (userInput?.trim() === "") return;

    await apiHandler(
      () =>
        addNewMessage({
          content: userInput,
          receiverId: selectedChat ? selectedChat._id : "",
        }),
      null,
      (res) => {
        const newMessage: ChatMessageInterface = {
          content: userInput,
          receiver: res.data.message.receiver,
          sender: res.data.message.sender,
          _id: res.data.message._id,
        };
        setSelectedChatMessages((prev) => {
          return [...prev, newMessage];
        });

        setUserInput("");
      },
      (err) => console.log(err),
    );
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessageHandler();
              }
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
