import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

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
        console.log("User ID" + data.userId);
        document.cookie = "token=" + data.token;
        setUserId(data.userId);
        return data;
      })
      .then((res) => {
        console.log(userId);
        navigate("/dashboard", {
          state: { userId: res.userId, token: res.token },
        });
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
