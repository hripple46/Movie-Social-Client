import React, { useState, useEffect } from "react";

export default function GroupList({ userId, token }) {
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    getGroups();
  }, [userId, token]);

  const getGroups = () => {
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
        console.log(data);
        setGroups(data);
      });
  };
  return (
    <div>
      <h1>Group List</h1>
      <ul>
        {groups.map((group) => {
          return <li key={group}>{group}</li>;
        })}
      </ul>
    </div>
  );
}
