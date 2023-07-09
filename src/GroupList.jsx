import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Posts from "./Posts.jsx";

export default function GroupList({ userId, token }) {
  const [groups, setGroups] = useState([]);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getGroups();
  }, [userId, token]);

  const getGroups = () => {
    //get groups from backend
    try {
      fetch("http://localhost:3000/users/" + userId + "/groups", {
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

  const getPosts = (groupId) => {
    //set posts to empty array
    setPosts([]);
    //get posts from backend
    try {
      fetch("http://localhost:3000/groups/" + groupId + "/posts", {
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
    <div className="w-full">
      <h1 className="text-2xl font-bold  mb-2 text-left">Groups</h1>
      <div className="flex w-full justify-between">
        <ul>
          {groups.map((group) => {
            return (
              <li
                className="p-2 hover:cursor-pointer hover:bg-gray-200"
                onClick={() => getPosts(group.id)}
                key={group.id}
              >
                {group.name}
              </li>
            );
          })}
        </ul>
        {<Posts posts={posts} />}
      </div>
    </div>
  );
}
