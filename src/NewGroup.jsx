import { useState } from "react";

export default function NewGroup({ user, token }) {
  const [showForm, setShowForm] = useState(false);
  console.log("User", user);
  const submitNewGroup = (e) => {
    e.preventDefault();
    setShowForm(false);
    //send fetch request to join group
    fetch("https://billowing-dawn-923.fly.dev/groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name: e.target.groupName.value,
        admin: user,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Data: ", data);
        location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="relative">
      <h1 className="hover:cursor-pointer" onClick={() => setShowForm(true)}>
        New Group
      </h1>
      <div
        className={`${
          showForm ? `block` : `hidden`
        } absolute z-50 text-black shadow-lg p-2 w-[250px] top-full left-0 bg-gray-300 rounded-md justify-center flex flex-col ${
          showForm ? `block` : `hidden`
        }`}
      >
        <form onSubmit={(e) => submitNewGroup(e)}>
          <label htmlFor="groupName">Group Name:</label>
          <input type="text" name="groupName" id="groupName" />
          <input
            className="w-full bg-green-200 rounded-md mt-4 hover:cursor-pointer p-2"
            type="submit"
            value="Create Group"
          />
        </form>
        <p
          onClick={() => setShowForm(false)}
          className="hover:cursor-pointer mr-1 absolute top-0 right-0"
        >
          Close
        </p>
      </div>
    </div>
  );
}
