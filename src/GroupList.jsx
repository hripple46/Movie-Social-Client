import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Posts from "./Posts.jsx";
import NewPost from "./NewPost.jsx";

export default function GroupList({ userId, token, user }) {
  const [groups, setGroups] = useState([]);
  const [posts, setPosts] = useState([]);
  const [activeGroup, setActiveGroup] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    getGroups();
  }, [userId, token]);

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
    //set posts to empty array
    setPosts([]);
    //set active group
    setActiveGroup(group);
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
                  className="p-2 hover:cursor-pointer hover:bg-gray-700 rounded-lg"
                  onClick={() => getPosts(group.id, group)}
                  key={group.id}
                >
                  {group.name}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="basis-2/3 bg-gray-200 h-full overflow-y-scroll">
          {<Posts posts={posts} currentUser={user} />}
          <div className="fixed bottom-2 ml-2 w-1/2">
            <NewPost group={activeGroup} user={user} token={token} />
          </div>
        </div>
      </div>
    </div>
  );
}
