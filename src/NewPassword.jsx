import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function NewPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userToken, setUserToken] = useState("");
  let { token } = useParams();
  useEffect(() => {
    //get token from url

    let tokenParam = token;
    console.log(tokenParam);
    setUserToken(tokenParam);
  }, []);

  const resetUserPassword = () => {
    //fetch reset password route
    fetch(
      "https://billowing-dawn-923.fly.dev/users/reset-password/" + userToken
    ),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
          confirmPassword: confirmPassword,
        }),
      }.then((response) => {
        //check if response is ok
        if (!response.ok) {
          //throw error if incorrect credentials
          throw new Error("Incorrect Credentials");
        }
        //if response is ok, send user to login
        navigate("/");
      });
  };

  return (
    <div className="absolute flex items-center justify-center w-full h-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          resetUserPassword();
        }}
        className="w-1/3 justify-center flex flex-col"
      >
        <label htmlFor="password">Password:</label>
        <input
          className="w-full bg-gray-200 rounded-md "
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
        />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          className="w-full bg-gray-200 rounded-md "
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          name="confirmPassword"
        />
        <button
          className="w-full bg-green-200 rounded-md mt-4 hover:cursor-pointer"
          type="submit"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
