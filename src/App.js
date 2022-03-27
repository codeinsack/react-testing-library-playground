import SignUp from "./pages/SignUp/SignUp";
import LanguageSelector from "./components/LanguageSelector/LanguageSelector";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import User from "./pages/User/User";

function App() {
  return (
    <div className="container">
      {window.location.pathname === "/" && <Home />}
      {window.location.pathname === "/signup" && <SignUp />}
      {window.location.pathname === "/login" && <Login />}
      {window.location.pathname.startsWith("/user/") && <User />}
      <LanguageSelector />
    </div>
  );
}

export default App;
