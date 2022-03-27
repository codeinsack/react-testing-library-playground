import SignUp from "./pages/SignUp/SignUp";
import LanguageSelector from "./components/LanguageSelector/LanguageSelector";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import User from "./pages/User/User";
import { useTranslation } from "react-i18next";
import { useState } from "react";

function App() {
  const { t } = useTranslation();
  const [path, setPath] = useState(window.location.pathname);

  const onLinkClick = (event) => {
    event.preventDefault();
    const path = event.target.attributes.href.value;
    window.history.pushState({}, "", path);
    setPath(path);
  };

  return (
    <div className="container">
      <div>
        <a href="/" title="Home" onClick={onLinkClick}>
          {t("home")}
        </a>
        <a href="/signup" title="Sign Up" onClick={onLinkClick}>
          {t("signUp")}
        </a>
        <a href="/login" title="Login" onClick={onLinkClick}>
          {t("login")}
        </a>
      </div>
      {path === "/" && <Home />}
      {path === "/signup" && <SignUp />}
      {path === "/login" && <Login />}
      {path.startsWith("/user/") && <User />}
      <LanguageSelector />
    </div>
  );
}

export default App;
