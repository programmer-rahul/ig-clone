import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserInterface } from "../interfaces/user";
import { apiHandler, LocalStorage } from "../utils";
import { signinUser } from "../api";
import { useNavigate } from "react-router-dom";

interface LoginInterface {
  data: { username: string; password: string };
  options?: {
    _setLoading?: (isLoading: boolean) => void;
    _setApiError?: (apiError: string) => void;
  };
}

type ContextType = {
  user: UserInterface | null;
  token: string | null;

  setUser: Dispatch<SetStateAction<UserInterface | null>>;
  setToken: Dispatch<SetStateAction<string | null>>;

  signin: ({}: LoginInterface) => Promise<void>;
};

export const AuthContext = createContext<ContextType>({
  user: null,
  token: null,

  setUser: () => {},
  setToken: () => {},
  signin: async () => {},
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserInterface | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const _user = LocalStorage.get("user");
    const _token = LocalStorage.get("token");
    if (_user && _token) {
      setUser(_user);
      setToken(_token);
    }
    setIsLoading(false);
  }, []);

  const signin = async ({ data, options }: LoginInterface) => {
    await apiHandler(
      () => signinUser(data),
      options?._setLoading ? options._setLoading : null,
      (res) => {
        const { data } = res;
        console.log(data);
        setUser(data.user);
        setToken(data.accessToken);
        LocalStorage.set("user", data.user);
        LocalStorage.set("token", data.accessToken);
        navigate("/");
      },
      (error) => {
        options?._setApiError && options._setApiError(error);
        console.log("Error in api call :- ", error);
      },
    );
  };

  return (
    <AuthContext.Provider value={{ user, token, signin, setToken, setUser }}>
      {isLoading ? <div></div> : children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
