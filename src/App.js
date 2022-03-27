import SignUp from "./pages/SignUp/SignUp";
import LanguageSelector from "./components/LanguageSelector/LanguageSelector";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import User from "./pages/User/User";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import logo from "./assets/hoaxify.png";

function App() {
  const { t } = useTranslation();
  const [path, setPath] = useState(window.location.pathname);

  const onLinkClick = (event) => {
    event.preventDefault();
    const path = event.currentTarget.attributes.href.value;
    window.history.pushState({}, "", path);
    setPath(path);
  };

  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-light shadow-sm">
        <div className="container">
          <a
            className="navbar-brand"
            href="/"
            title="Home"
            onClick={onLinkClick}
          >
            <img src={logo} width="60" alt="Hoaxify" />
            Hoaxify
          </a>
          <ul className="navbar-nav">
            <a
              className="nav-link"
              href="/signup"
              title="Sign Up"
              onClick={onLinkClick}
            >
              {t("signUp")}
            </a>
            <a
              className="nav-link"
              href="/login"
              title="Login"
              onClick={onLinkClick}
            >
              {t("login")}
            </a>
          </ul>
        </div>
      </nav>
      <div className="container">
        {path === "/" && <Home />}
        {path === "/signup" && <SignUp />}
        {path === "/login" && <Login />}
        {path.startsWith("/user/") && <User />}
        <LanguageSelector />
      </div>
    </>
  );
}

export default App;
