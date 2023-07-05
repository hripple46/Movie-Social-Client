import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  //login user and set cookie
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
        //check if response is ok
        if (!response.ok) {
          //throw error if incorrect credentials
          throw new Error("Incorrect Credentials");
        }
        //if response is ok, return response
        return response.json();
      })
      //set cookie and navigate to dashboard
      .then((data) => {
        console.log("Data: ", data);
        console.log("User ID" + data.userId);
        document.cookie = "token=" + data.token;
        document.cookie = "userId=" + data.userId;
        setUserId(data.userId);
        navigate("/dashboard");
        return data;
      })

      .then(() => {
        console.log(userId);
        navigate("/dashboard");
      })
      //catch error and log it
      //navigate to '/' if error
      .catch((err) => {
        console.log(err);
        navigate("/");
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
