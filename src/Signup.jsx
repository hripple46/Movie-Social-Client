import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);

  const navigate = useNavigate();

  const createUser = (e) => {
    e.preventDefault();
    //send fetch request to create user
    fetch("https://billowing-dawn-923.fly.dev/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    })
      .then((response) => {
        //check if response is ok
        if (!response.ok) {
          //throw error if incorrect credentials
          throw new Error("Try Again");
        }
        //if response is ok, return response
        return response.json();
      })
      .then(() => {
        navigate("/");
      });
  };

  return (
    <div className="absolute flex items-center justify-center w-full h-full">
      <form className="w-1/3 justify-center flex flex-col">
        <label htmlFor="email">Email:</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
        />
        <label className="w-full" htmlFor="username">
          Username:
          <input
            className="w-full bg-gray-200 rounded-md   "
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            name="username"
          />
        </label>
        <label className="w-full" htmlFor="password">
          Password:
          <input
            className="w-full bg-gray-200 rounded-md "
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
          />
        </label>
        <input
          className="w-full bg-green-200 rounded-md mt-4 hover:cursor-pointer"
          onClick={createUser}
          type="submit"
          value="Signup"
        />
      </form>
    </div>
  );
}
