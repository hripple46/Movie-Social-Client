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
  const [showInstructions, setShowInstructions] = useState(false);

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
      {showInstructions && (
        <div className="ml-6 mr-6 rounded-md mb-6 fixed top-1/4 h-1/2 z-50 bg-stone-900/75 backdrop-blur-xl text-white shadow-lg left-0 right-0">
          <svg
            onClick={() => setShowInstructions(false)}
            className="absolute top-0 right-0 z-40  hover:cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="48 "
            height="48"
            viewBox="0 -960 960 960"
            fill="white"
          >
            <path d="M249-207l-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231z"></path>
          </svg>

          <div className="absolute pl-12 pr-12 top-6 right-0 left-0 bottom-0 overflow-y-scroll z-30">
            <ul className="flex flex-col items-center">
              Welcome to our cinematic playground! It's your turn to direct.
              <li className="flex items-center mb-2 mt-2 w-full">
                <div className="mr-2 w-1/8">
                  <svg
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 -960 960 960"
                  >
                    <path d="M140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h520q24 0 42 18t18 42v215l160-160v410L720-435v215q0 24-18 42t-42 18H140zm0-60h520v-520H140v520zm0 0v-520 520z"></path>
                  </svg>
                </div>
                <p className="w-2/3">
                  Start with an empty left sidebar: this is your 'New Group'
                  button cue.
                </p>
              </li>
              <li className="flex items-center mb-2 w-full">
                <div className="mr-2 w-1/8">
                  <svg
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 -960 960 960"
                  >
                    <path d="M140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h520q24 0 42 18t18 42v215l160-160v410L720-435v215q0 24-18 42t-42 18H140zm0-60h520v-520H140v520zm0 0v-520 520z"></path>
                  </svg>
                </div>
                <p className="w-2/3">
                  Create a group by typing a catchy name, hit 'Submit' and see
                  your blockbuster title in the sidebar.
                </p>
              </li>
              <li className="flex items-center mb-2 w-full">
                <div className="mr-2 w-1/8">
                  <svg
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 -960 960 960"
                  >
                    <path d="M140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h520q24 0 42 18t18 42v215l160-160v410L720-435v215q0 24-18 42t-42 18H140zm0-60h520v-520H140v520zm0 0v-520 520z"></path>
                  </svg>
                </div>
                <p className="w-2/3">
                  Click the group: right side is your movie review canvas.
                </p>
              </li>
              <li className="flex items-center mb-2 w-full">
                <div className="mr-2 w-1/8">
                  <svg
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 -960 960 960"
                  >
                    <path d="M140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h520q24 0 42 18t18 42v215l160-160v410L720-435v215q0 24-18 42t-42 18H140zm0-60h520v-520H140v520zm0 0v-520 520z"></path>
                  </svg>
                </div>
                <p className="w-2/3">
                  Type a movie name at the bottom to get auto-results. Click to
                  select the right film.
                </p>
              </li>
              <li className="flex items-center mb-2 w-full">
                <div className="mr-2 w-1/8">
                  <svg
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 -960 960 960"
                  >
                    <path d="M140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h520q24 0 42 18t18 42v215l160-160v410L720-435v215q0 24-18 42t-42 18H140zm0-60h520v-520H140v520zm0 0v-520 520z"></path>
                  </svg>
                </div>
                <p className="w-2/3">
                  Critic time! Thumbs up to recommend, thumbs down for a pass.
                  Hit 'Submit' to post.
                </p>
              </li>
              <li className="flex items-center mb-2 w-full">
                <div className="mr-2 w-1/8">
                  <svg
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 -960 960 960"
                  >
                    <path d="M140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h520q24 0 42 18t18 42v215l160-160v410L720-435v215q0 24-18 42t-42 18H140zm0-60h520v-520H140v520zm0 0v-520 520z"></path>
                  </svg>
                </div>
                <p className="w-2/3">
                  Intrigued by a movie someone posted? Click the blue title for
                  a preview and summary.
                </p>
              </li>
              <li className="flex items-center mb-2 w-full">
                <div className="mr-2 w-1/8">
                  <svg
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 -960 960 960"
                  >
                    <path d="M140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h520q24 0 42 18t18 42v215l160-160v410L720-435v215q0 24-18 42t-42 18H140zm0-60h520v-520H140v520zm0 0v-520 520z"></path>
                  </svg>
                </div>
                <p className="w-2/3">
                  Ready to gather an audience? Have friends request to join by
                  typing your group name.
                </p>
              </li>
              <li className="flex items-center mb-2 w-full">
                <div className="mr-2 w-1/8">
                  <svg
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 -960 960 960"
                  >
                    <path d="M140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h520q24 0 42 18t18 42v215l160-160v410L720-435v215q0 24-18 42t-42 18H140zm0-60h520v-520H140v520zm0 0v-520 520z"></path>
                  </svg>
                </div>
                <p className="w-2/3">
                  As director, you approve or deny requests. Await your 'red
                  carpet' notification top right.
                </p>
              </li>
              <li className="flex items-center mb-2 w-full">
                <div className="mr-2 w-1/8">
                  <svg
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 -960 960 960"
                  >
                    <path d="M140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h520q24 0 42 18t18 42v215l160-160v410L720-435v215q0 24-18 42t-42 18H140zm0-60h520v-520H140v520zm0 0v-520 520z"></path>
                  </svg>
                </div>
                <p className="w-2/3">
                  You're set! It's lights, camera, action on your movie journey.
                </p>
              </li>
            </ul>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center fixed top-0 w-full z-20 bg-gray-200 text-black">
        <button className="ml-1" onClick={() => setJoinGroup(true)}>
          Join Group
        </button>

        <NewGroup user={user} token={token} />
        <div className="flex justify-center items-center">
          <div
            onClick={() => setShowInstructions(true)}
            className="rounded-full hover:cursor-pointer hover:bg-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 -960 960 960"
            >
              <path d="M431-330q1-72 16.5-105t58.5-72q42-38 64.5-70.5T593-647q0-45-30-75t-84-30q-52 0-80 29.5T358-661l-84-37q22-59 74.5-100.5T479-840q100 0 154 55.5T687-651q0 48-20.5 87T601-482q-49 47-59 72t-11 80H431zm48 250q-29 0-49.5-20.5T409-150q0-29 20.5-49.5T479-220q29 0 49.5 20.5T549-150q0 29-20.5 49.5T479-80z"></path>
            </svg>
          </div>
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
