import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { User } from "../utils/types";
import { useAuth } from "./AuthContext";
import { LocalStorage } from "../utils";
import { NotificationInterface } from "../interfaces/home";

type ContextType = {
  isPopup: boolean;
  currentUser: User | null;

  setIsPopup: Dispatch<SetStateAction<boolean>>;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;

  allNotifications: NotificationInterface[] | [];

  onConnect: () => void;
  onDisconnect: () => void;
  onSocketError: () => void;
  onNotification: (data: NotificationInterface) => void;
};
export const HomeContext = createContext<ContextType>({
  isPopup: false,
  setIsPopup: () => {},

  currentUser: null,
  setCurrentUser: () => {},

  // states
  allNotifications: [],

  // socket listeners
  onConnect: () => {},
  onDisconnect: () => {},
  onSocketError: () => {},
  onNotification: () => {},
});

export const HomeProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  const [isPopup, setIsPopup] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const localUser: User = LocalStorage.get("user");
    return localUser ? localUser : null;
  });

  useEffect(() => {
    const user: User = LocalStorage.get("user");
    if (user && user) {
      setCurrentUser(user);
    }
  }, [user]);

  const [isConnected, setIsConnected] = useState(false);

  const [allNotifications, setAllNotifications] = useState<
    NotificationInterface[] | []
  >([]);

  const onConnect = () => {
    console.log("Connected to server!");
    setIsConnected(true);
  };
  const onDisconnect = () => {
    console.log("DisConnected to server!");
    setIsConnected(false);
  };
  const onSocketError = () => {
    console.log("Error in connecting to socket server");
  };

  const onNotification = (data: NotificationInterface) => {
    setAllNotifications((prev) => {
      return [...prev, data];
    });
  };

  return (
    <HomeContext.Provider
      value={{
        isPopup,
        setIsPopup,
        currentUser,
        setCurrentUser,

        allNotifications,

        onConnect,
        onDisconnect,
        onSocketError,
        onNotification,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
