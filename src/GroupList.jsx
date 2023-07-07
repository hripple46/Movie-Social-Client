import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GroupList({ userId, token }) {
  const [groups, setGroups] = useState([]);
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
          console.log("Posts", data);
          return data.posts;
        });
    } catch (err) {
      //catch error and log it
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Group List</h1>
      <ul>
        {groups.map((group) => {
          return (
            <li onClick={() => getPosts(group.id)} key={group.id}>
              {group.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
