import { useState } from "react";

export default function JoinGroup({ userId, token }) {
  const [groupName, setGroupName] = useState(null);

  const requestJoinGroup = (e) => {
    e.preventDefault();
    //send fetch request to join group
    fetch(
      "http://localhost:3000/groups/" + groupName + "/pendingusers/" + userId,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
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
      <form className="w-1/3 justify-center flex flex-col">
        <label className="w-full" htmlFor="groupName">
          Group Name:
          <input
            className="w-full bg-gray-200 rounded-md   "
            onChange={(e) => setGroupName(e.target.value)}
            type="text"
            name="groupName"
          />
        </label>
        <input
          className="w-full bg-green-200 rounded-md mt-4 hover:cursor-pointer"
          onClick={requestJoinGroup}
          type="submit"
          value="Join Group"
        />
      </form>
    </div>
  );
}
