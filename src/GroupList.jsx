import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Posts from "./Posts.jsx";
import NewPost from "./NewPost.jsx";

export default function GroupList({ userId, token, user }) {
  const [groups, setGroups] = useState([]);
  const [posts, setPosts] = useState([]);
  const [activeGroup, setActiveGroup] = useState({});
  const [loadingPosts, setLoadingPosts] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getGroups();
  }, [userId, token]);

  useEffect(() => {
    //get active group from local storage
    const storedGroup = localStorage.getItem("activeGroup");
    //convert to object
    const storedGroupObj = JSON.parse(storedGroup);
    //if active group exists, get posts for that group
    if (storedGroupObj) {
      getPosts(storedGroupObj.id, storedGroupObj);
    }
  }, []);

  const getGroups = () => {
    //get groups from backend
    try {
      fetch("https://billowing-dawn-923.fly.dev/users/" + userId + "/groups", {
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
          console.log("Groups", data);
          return data.groupNames;
        })
        .then((groupNames) => {
          setGroups(groupNames);
        });
    } catch (err) {
      //catch error and log it
      //navigate to '/' if error
      console.log(err);
      navigate("/");
    }
  };

  const getPosts = (groupId, group) => {
    //set loading posts to true
    setLoadingPosts(true);
    //set posts to empty array
    setPosts([]);
    //set active group
    setActiveGroup(group);
    console.log("Active Group", activeGroup);
    //save activeGroup to local storage so that refresh doesn't clear it
    localStorage.setItem("activeGroup", JSON.stringify(group));
    //get posts from backend
    try {
      fetch("https://billowing-dawn-923.fly.dev/groups/" + groupId + "/posts", {
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
          return data.groupPosts;
        })
        .then((posts) => {
          setLoadingPosts(false);
          setPosts(posts);
        });
    } catch (err) {
      //catch error and log it

      console.log(err);
    }
  };

  return (
    <div className="w-full h-full bg-gray-200">
      <h1 className="text-2xl font-bold  mb-2 text-left">Groups</h1>
      <div className="flex w-full h-full relative bg-gray-200">
        <div className="bg-gray-200 text-black basis-1/3 relative border-r-2 mr-2 border-gray-300  p-2">
          <ul className="w-full pr-0">
            {groups.map((group) => {
              return (
                <li
                  className="p-2 hover:cursor-pointer hover:bg-gray-300 rounded-lg"
                  onClick={() => getPosts(group.id, group)}
                  key={group.id}
                >
                  {group.name}
                </li>
              );
            })}
          </ul>
        </div>
        <div
          className={`basis-2/3 bg-gray-200 h-full overflow-y-scroll ${
            loadingPosts ? "flex justify-center items-center" : ""
          }`}
        >
          {loadingPosts && (
            <div className="flex flex-col justify-center items-center">
              Loading Posts...{" "}
              <svg
                className="animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 -960 960 960"
              >
                <path d="M480-80q-84 0-157-31t-127-85q-54-54-85-127T80-480q0-84 31-157t85-127q54-54 127-85t157-31q12 0 21 9t9 21q0 12-9 21t-21 9q-141 0-240.5 99.5T140-480q0 141 99.5 240.5T480-140q141 0 240.5-99.5T820-480q0-12 9-21t21-9q12 0 21 9t9 21q0 84-31 157t-85 127q-54 54-127 85T480-80z"></path>
              </svg>
            </div>
          )}
          {<Posts posts={posts} currentUser={user} />}
          <div className="fixed bottom-2 md:ml-2 md:w-2/3 w-full md:right-0 left-0 md:left-auto ml-0 bg-gray-200">
            <NewPost group={activeGroup} user={user} token={token} />
          </div>
        </div>
      </div>
    </div>
  );
}
