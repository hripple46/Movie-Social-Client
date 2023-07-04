import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginUser = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
        <label htmlFor="username">
          Username:
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            name="username"
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
          />
        </label>
        <input onClick={loginUser} type="submit" />
      </form>
    </div>
  );
}
