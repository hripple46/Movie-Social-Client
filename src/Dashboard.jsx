import { useState, useEffect } from "react";
import GroupList from "./GroupList";
import { useNavigate } from "react-router-dom";
import JoinGroup from "./JoinGroup";
import AdminRequests from "./AdminRequests";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const cookie = getCookie("token");
    setToken(cookie);
    const cookie2 = getCookie("userId");
    setUserId(cookie2);
    setIsLoading(false); // After setting the token and userId, set isLoading to false

    // Get user name
    const getUserName = (userId) => {
      fetch("http://localhost:3000/users/" + userId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("User", data);
          setUser(data);
          setUsername(data.username);
        });
    };
    getUserName(userId);
  }, [navigate, token, userId]);

  //if no token or userId, redirect to '/'
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

  if (isLoading) {
    return null; // Or return a loading spinner here
  }

  return (
    <div>
      <div className="flex justify-between">
        <h1>Hi, {username}</h1>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={logoutUser}
        >
          Logout
        </button>
      </div>
      <div className="flex">
        <GroupList userId={userId} token={token} />
        {
          //will add posts here
        }
      </div>
      <JoinGroup userId={userId} token={token} />
      <AdminRequests user={user} />
    </div>
  );
}
