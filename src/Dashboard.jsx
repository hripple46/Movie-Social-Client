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
            <p>
              Welcome, movie enthusiast, to our interactive web app! We've made
              a neat, vibrant space for you to share and discover movie
              recommendations with friends. Here's a quick rundown on how to get
              the film reels rolling. When you first join, your left sidebar
              will seem rather lonely - devoid of any groups. Don't worry! This
              is your cue to create one. Just click on "New Group", kind of like
              you're about to write the next blockbuster's title. Type in your
              chosen name and hit 'Submit'. Voila! You'll see the group appear
              in the left sidebar, like your name in shining movie credits. Give
              the group you've just created a click and you'll notice the right
              side of the page looks empty. That's because it's the canvas for
              your upcoming film reviews. Wander down to the bottom of the page
              and start typing a movie name - just like magic, results will
              automatically appear! Spot the movie you're thinking of? Click on
              it to select. Now for the real fun part: it's time to be the
              critic. Do you recommend this movie to your friends or not? Click
              the thumbs up button to give it your seal of approval or the
              thumbs down button to suggest they spend their time elsewhere.
              Once you've made your decision, hit 'Submit' and behold as your
              post populates in the group. Want to know more about a movie
              someone else posted? Simply click on the blue title of the movie
              in the post. This will conjure up a nifty preview and a quick
              summary. No more endless scrolling or looking up reviews. We've
              got you covered. Now, what's a movie without an audience? When
              you're ready to invite friends to join your movie group, simply
              have them type in the exact name of your group (capital letters
              and all!) and send a request. As the director of this group, you
              get to approve or deny these requests. The next time you log in, a
              notification will be waiting for you on the top right corner of
              your screen. It's like your own little red carpet - click on it to
              see any pending requests for your group. That's it! You're ready
              to run the show. Lights, camera, action! Enjoy discovering and
              sharing the magic of cinema on our web app.
            </p>
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
