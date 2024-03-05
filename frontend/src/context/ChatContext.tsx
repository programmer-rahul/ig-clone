import {
  useContext,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

type ContextTypes = {
  userInput: string;

  setUserInput: Dispatch<SetStateAction<string>>;
};

export const ChatContext = createContext<ContextTypes>({
  userInput: "",
  setUserInput: () => {},
});

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [userInput, setUserInput] = useState("");

  return (
    <ChatContext.Provider value={{ userInput, setUserInput }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
