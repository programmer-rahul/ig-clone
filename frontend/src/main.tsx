import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AuthProvider from "./context/AuthContext.tsx";
import { HomeProvider } from "./context/HomeContext.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <HomeProvider>
          <App />
        </HomeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
