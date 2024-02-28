import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import VerificationPage from "./pages/VerificationPage.tsx";
import ProfileSetupPage from "./pages/ProfileSetupPage.tsx";
import SignInPage from "./pages/SignInPage.tsx";
import ProtectedRoute from "./services/ProtectedRoute.tsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/verify-otp" element={<VerificationPage />} />
        <Route path="/profile-setup" element={<ProfileSetupPage />} />
      </Routes>
    </Router>
  );
};
export default App;
