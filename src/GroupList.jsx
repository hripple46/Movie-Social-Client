import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Posts from "./Posts.jsx";
import NewPost from "./NewPost.jsx";

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
    <div className="w-full h-full">
      <h1 className="text-2xl font-bold  mb-2 text-left">Groups</h1>
      <div className="flex w-full h-full relative ">
        <div className="bg-gray-200 basis-1/3 relative">
          <ul className="sticky top-0 w-full">
            {groups.map((group) => {
              return (
                <li
                  className="p-2 hover:cursor-pointer hover:bg-gray-400"
                  onClick={() => getPosts(group.id)}
                  key={group.id}
                >
                  {group.name}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="basis-2/3">
          {<Posts posts={posts} />}
          <div className="fixed bottom-2 ml-2 w-1/2">
            <NewPost />
          </div>
        </div>
      </div>
    </div>
  );
}
