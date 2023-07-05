import { useState, useEffect } from "react";
import GroupList from "./GroupList";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const cookie = getCookie("token");
    setToken(cookie);
    const cookie2 = getCookie("userId");
    setUserId(cookie2);
    setIsLoading(false); // After setting the token and userId, set isLoading to false
  }, [navigate]);

  if (isLoading) {
    return null; // Or return a loading spinner here
  }

  if (!token || !userId) {
    navigate("/");
    return null;
  }
  //extract token from cookie
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  //logout user by removing cookie and redirecting to '/'
  async function logoutUser(e) {
    e.preventDefault();
    const eraseCookie = (document.cookie =
      "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;");
    await eraseCookie;
    const eraseCookie2 = (document.cookie =
      "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;");
    await eraseCookie2;
    navigate("/");
  }

  return (
    <div>
      <h1>You're Logged In</h1>
      <h2>Token: {token}</h2>

      <button onClick={logoutUser}>Logout</button>
      <GroupList userId={userId} token={token} />
    </div>
  );
}
