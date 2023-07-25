import { useState, useEffect, useRef } from "react";
import GroupList from "./GroupList";
import { useNavigate } from "react-router-dom";
import JoinGroup from "./JoinGroup";
import AdminRequests from "./AdminRequests";
import DropdownIcon from "./assets/DropdownIcon";
import NewPost from "./NewPost";
import NewGroup from "./NewGroup";

export default function Dashboard() {
  const navigate = useNavigate();
  //user state includes user document from database
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [joinGroup, setJoinGroup] = useState(false);
  const [showProfileDetails, setShowProfileDetails] = useState(false);

  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        event.target.id !== "logout-button"
      ) {
        setShowProfileDetails(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //use hook to pull user information from cookie
  useEffect(() => {
    // Check if user is logged in
    const cookie = getCookie("token");
    setToken(cookie);
    const cookie2 = getCookie("userId");
    setUserId(cookie2);
    setIsLoading(false); // After setting the token and userId, set isLoading to false

    // Get user name
    const getUserName = (userId) => {
      fetch("https://billowing-dawn-923.fly.dev/users/" + userId, {
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
    setShowProfileDetails(false); // add this line

    location.reload();
  }

  if (isLoading) {
    return null; // Or return a loading spinner here
  }

  return (
    <div className="w-full h-full relative bg-gray-200">
      <div className="flex justify-between items-center fixed top-0 w-full z-20 bg-gray-200 text-black">
        <button className="ml-1" onClick={() => setJoinGroup(true)}>
          Join Group
        </button>

        <NewGroup user={user} token={token} />
        <div className="flex">
          <AdminRequests user={user} />
          <div className="relative">
            <div
              className="h-full flex items-center cursor-pointer"
              onClick={() => setShowProfileDetails(true)}
              ref={profileRef}
            >
              <h1>Hi, {username}</h1>
              <DropdownIcon />
            </div>

            <button
              id="logout-button"
              className={`logout-button transition-all duration-500 absolute right-0 bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded overflow-hidden ${
                showProfileDetails ? "visible max-h-20" : "invisible max-h-4"
              }`}
              onClick={logoutUser}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="flex w-full pb-16 bg-gray-200 h-[calc(100vh-40px)]">
        <GroupList userId={userId} user={user} token={token} />
      </div>
      <JoinGroup
        show={joinGroup}
        onHide={() => setJoinGroup(false)}
        userId={userId}
        token={token}
      />
    </div>
  );
}
