import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function NewPassword() {
  cosnt[(password, setPassword)] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    //get token from url

    let { token } = useParams();
    console.log(tokenParam);
    setUserToken(tokenParam);
  }, []);

  const resetUserPassword = (e) => {
    e.preventDefault();
    //fetch reset password route
  };

  return (
    <div className="absolute flex items-center justify-center w-full h-full">
      <form className="w-1/3 justify-center flex flex-col">
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
          onClick={resetUserPassword}
          type="submit"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
