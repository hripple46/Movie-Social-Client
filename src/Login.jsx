import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();

  //login user and set cookie
  const loginUser = (e) => {
    e.preventDefault();

    fetch("https://billowing-dawn-923.fly.dev/users/login", {
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
        navigate("/");
        return data;
      })

      .then(() => {
        console.log(userId);
        navigate("/");
      })
      //catch error and log it
      //navigate to '/' if error
      .catch((err) => {
        console.log(err);
        setLoginError(err.message);

        navigate("/");
      });
  };

  return (
    <div className="w-full h-full border-2 flex flex-col items-center justify-center">
      {loginError && <p>{loginError}</p>}
      <form className="w-1/3 justify-center flex flex-col">
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
          onClick={loginUser}
          type="submit"
          value="Login"
        />
      </form>
      <div className="flex items-center mt-4">
        <p>Don't have an account?</p>
        <button
          onClick={() => navigate("/signup")}
          className="ml-1 bg-blue-200 pl-2 pr-2 rounded-md  hover:cursor-pointer"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
