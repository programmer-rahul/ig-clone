import {
  useContext,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { ChatUserInterface } from "../interfaces/chat";
import { ChatMessageInterface } from "../interfaces/chat";

type ContextTypes = {
  userInput: string;
  searchPopUp: boolean;
  allChatUsers: ChatUserInterface[] | [];
  selectedChat: ChatUserInterface | null;
  selectedChatMessages: ChatMessageInterface[] | [];
  unreadMessages: ChatMessageInterface[] | [];
  onlineUsers: string[] | [];

  setUserInput: Dispatch<SetStateAction<string>>;
  setSearchPopUp: Dispatch<SetStateAction<boolean>>;
  setAllChatUsers: Dispatch<SetStateAction<ChatUserInterface[] | []>>;
  setSelectedChat: Dispatch<SetStateAction<ChatUserInterface | null>>;
  setSelectedChatMessages: Dispatch<
    SetStateAction<ChatMessageInterface[] | []>
  >;
  setUnreadMessages: Dispatch<SetStateAction<ChatMessageInterface[] | []>>;
  setOnlineUsers: Dispatch<SetStateAction<string[] | []>>;
};

export const ChatContext = createContext<ContextTypes>({
  userInput: "",
  allChatUsers: [],
  searchPopUp: false,
  selectedChat: null,
  selectedChatMessages: [],
  unreadMessages: [],
  onlineUsers: [],

  setUserInput: () => {},
  setAllChatUsers: () => {},
  setSearchPopUp: () => {},
  setSelectedChat: () => {},
  setSelectedChatMessages: () => {},
  setUnreadMessages: () => {},
  setOnlineUsers: () => {},
});

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [userInput, setUserInput] = useState("");
  const [searchPopUp, setSearchPopUp] = useState(false);
  const [allChatUsers, setAllChatUsers] = useState<ChatUserInterface[] | []>(
    [],
  );
  const [selectedChat, setSelectedChat] = useState<ChatUserInterface | null>(
    null,
  );
  const [selectedChatMessages, setSelectedChatMessages] = useState<
    ChatMessageInterface[] | []
  >([]);
  const [unreadMessages, setUnreadMessages] = useState<
    ChatMessageInterface[] | []
  >([]);

  const [onlineUsers, setOnlineUsers] = useState<string[] | []>([]);

  return (
    <ChatContext.Provider
      value={{
        userInput,
        setUserInput,
        allChatUsers,
        setAllChatUsers,
        searchPopUp,
        setSearchPopUp,
        selectedChat,
        setSelectedChat,
        selectedChatMessages,
        setSelectedChatMessages,
        unreadMessages,
        setUnreadMessages,
        onlineUsers,
        setOnlineUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
