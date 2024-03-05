import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AuthProvider from "./context/AuthContext.tsx";
import { HomeProvider } from "./context/HomeContext.tsx";
import { BrowserRouter } from "react-router-dom";
import { SocketProvider } from "./context/SocketContext.tsx";
import { ChatProvider } from "./context/ChatContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <SocketProvider>
        <HomeProvider>
          <ChatProvider>
            <App />
          </ChatProvider>
        </HomeProvider>
      </SocketProvider>
    </AuthProvider>
  </BrowserRouter>,
  // </React.StrictMode>,
);
