import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { NotificationInterface } from "../interfaces/home";

type ContextType = {
  isPopup: boolean;
  setIsPopup: Dispatch<SetStateAction<boolean>>;

  allNotifications: NotificationInterface[] | [];

  onConnect: () => void;
  onDisconnect: () => void;
  onSocketError: () => void;
  onNotification: (data: NotificationInterface) => void;
};
export const HomeContext = createContext<ContextType>({
  isPopup: false,
  setIsPopup: () => {},

  // states
  allNotifications: [],

  // socket listeners
  onConnect: () => {},
  onDisconnect: () => {},
  onSocketError: () => {},
  onNotification: () => {},
});

export const HomeProvider = ({ children }: { children: ReactNode }) => {
  const [isPopup, setIsPopup] = useState(false);

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

export const useHome = () => useContext(HomeContext);
