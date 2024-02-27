import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

type ContextType = {
  isPopup: boolean;
  setIsPopup: Dispatch<SetStateAction<boolean>>;
};
export const HomeContext = createContext<ContextType>({
  isPopup: false,
  setIsPopup: () => {},
});

export const HomeProvider = ({ children }: { children: ReactNode }) => {
  const [isPopup, setIsPopup] = useState(false);

  return (
    <HomeContext.Provider value={{ isPopup, setIsPopup }}>
      {children}
    </HomeContext.Provider>
  );
};
