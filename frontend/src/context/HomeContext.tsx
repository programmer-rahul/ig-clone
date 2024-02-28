import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { User } from "../utils/types";
import { getUserFromLocal } from "../utils/localStorage";
import useAuth from "../hooks/useAuth";

type ContextType = {
  isPopup: boolean;
  currentUser: User | null;

  setIsPopup: Dispatch<SetStateAction<boolean>>;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
};
export const HomeContext = createContext<ContextType>({
  isPopup: false,
  setIsPopup: () => {},

  currentUser: null,
  setCurrentUser: () => {},
});

export const HomeProvider = ({ children }: { children: ReactNode }) => {
  const { isAuth } = useAuth();

  const [isPopup, setIsPopup] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const localUser: User = getUserFromLocal();
    return localUser ? localUser : null;
  });

  useEffect(() => {
    const user: User = getUserFromLocal();
    if (user && isAuth) {
      setCurrentUser(user);
    }
  }, [isAuth]);

  return (
    <HomeContext.Provider
      value={{ isPopup, setIsPopup, currentUser, setCurrentUser }}
    >
      {children}
    </HomeContext.Provider>
  );
};