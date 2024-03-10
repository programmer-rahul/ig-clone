import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import ChatPage from "./pages/ChatPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import VerificationPage from "./pages/VerificationPage.tsx";
import ProfileSetupPage from "./pages/ProfileSetupPage.tsx";
import SignInPage from "./pages/SignInPage.tsx";

const App = () => {
  return (
    <Routes>
      {/* <Route element={<ProtectedRoute />}> */}
      <Route path="/" element={<HomePage />} />
      <Route path="/chat" element={<ChatPage />} />
      {/* </Route> */}

      {/* <Route element={<PublicRoute />}> */}
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/verify-otp" element={<VerificationPage />} />
      <Route path="/profile-setup" element={<ProfileSetupPage />} />
      {/* </Route> */}
    </Routes>
  );
};
export default App;
