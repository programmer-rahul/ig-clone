import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import VerificationPage from "./pages/VerificationPage.tsx";
import ProfileSetupPage from "./pages/ProfileSetupPage.tsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verify" element={<VerificationPage />} />
        <Route path="/profile-setup" element={<ProfileSetupPage />} />
      </Routes>
    </Router>
  );
};
export default App;
