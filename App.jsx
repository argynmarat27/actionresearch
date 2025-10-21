import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import VerifiedSuccess from "./pages/VerifiedSuccess";
import Dashboard from "./pages/Dashboard"; // Жеке кабинет
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import HomePage from "./pages/HomePage";
import EditProfile from "./pages/edit-profile";
import MyResearch from "./pages/MyResearch";
import "./i18n";
import CreateResearch from "./pages/CreateResearch";
import ResearchMethod from "./pages/ResearchMethod";
import ResearchProcess from "./pages/ResearchProcess";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Басты бет */}
        <Route path="/login" element={<Login />} /> {/* Кіру */}
        <Route path="/register" element={<Register />} /> {/* Тіркелу */}
        <Route path="/verify/:token" element={<VerifyEmail />} /> {/* Пошта растау */}
        <Route path="/verified-success" element={<VerifiedSuccess />} /> {/* Расталған бет */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Жеке кабинет */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/my-research" element={<MyResearch />} />
        <Route path="/create-research" element={<CreateResearch />} />
         <Route path="/research-method" element={<ResearchMethod />} />
         <Route path="/research-process" element={<ResearchProcess />} />
      
      </Routes>
    </Router>
  );
}

export default App;
