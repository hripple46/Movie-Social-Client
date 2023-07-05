import Login from "./Login";
import "./App.css";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState("");

  // Check if user is logged in
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  //use hook to determine which componenet to render based on user status
  useEffect(() => {
    setToken("");
    const cookie = getCookie("token");
    setToken(cookie);
  }, []);

  //use hook to determine which componenet to render based on user status
  return token ? <Dashboard /> : <Login />;
}

export default App;
