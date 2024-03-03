import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import socketio from "socket.io-client";
import { LocalStorage, validateToken } from "../utils";
import { useAuth } from "./AuthContext";

const getSocket = () => {
  const token = LocalStorage.get("token");
  return socketio("http://localhost:5000", {
    withCredentials: true,
    auth: { token },
  });
};

type ContextTypes = {
  socket: ReturnType<typeof socketio> | null;
};

export const SocketContext = createContext<ContextTypes>({
  socket: null,
});

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState<ReturnType<typeof socketio> | null>(
    null,
  );
  useEffect(() => {
    user && setSocket(getSocket());
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
