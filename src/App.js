import SignUp from "./pages/SignUp/SignUp";
import LanguageSelector from "./components/LanguageSelector/LanguageSelector";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import User from "./pages/User/User";
import { useTranslation } from "react-i18next";
import logo from "./assets/hoaxify.png";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AccountActivation from "./pages/AccountActivation/Home";

function App() {
  const { t } = useTranslation();

  return (
    <Router>
      <nav className="navbar navbar-expand navbar-light bg-light shadow-sm">
        <div className="container">
          <Link className="navbar-brand" to="/" title="Home">
            <img src={logo} width="60" alt="Hoaxify" />
            Hoaxify
          </Link>
          <ul className="navbar-nav">
            <Link className="nav-link" to="/signup" title="Sign Up">
              {t("signUp")}
            </Link>
            <Link className="nav-link" to="/login" title="Login">
              {t("login")}
            </Link>
          </ul>
        </div>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/activate/:token" element={<AccountActivation />} />
        </Routes>
        <LanguageSelector />
      </div>
    </Router>
  );
}

export default App;
