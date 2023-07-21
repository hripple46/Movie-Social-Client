import { useState } from "react";

export default function NewGroup({ user, token, show, onHide }) {
  const submitNewGroup = (e) => {
    e.preventDefault();
    onHide();
    //send fetch request to join group
    fetch("http://localhost:3000/groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name: e.target.groupName.value,
        user: user,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Data: ", data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>New Group</h1>
      <form onSubmit={(e) => submitNewGroup(e)}>
        <label htmlFor="groupName">Group Name:</label>
        <input type="text" name="groupName" id="groupName" />
        <input type="submit" value="Create Group" />
      </form>
    </div>
  );
}
