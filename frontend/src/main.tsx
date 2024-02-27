import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AuthProvider from "./context/AuthContext.tsx";
import { HomeProvider } from "./context/HomeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <HomeProvider>
        <App />
      </HomeProvider>
    </AuthProvider>
  </React.StrictMode>,
);
