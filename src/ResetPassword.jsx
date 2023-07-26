import { useState } from "react";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const resetUserPassword = () => {
    //fetch reset password route
    try {
      fetch("https://billowing-dawn-923.fly.dev/users/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      }).then((response) => {
        //check if response is ok
        if (!response.ok) {
          //throw error if incorrect credentials
          throw new Error("Incorrect Credentials");
        }
        //if response is ok, return response
        return response.json();
      });
    } catch (err) {
      //catch error and log it
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          resetUserPassword();
        }}
        className="w-1/3"
      >
        <label htmlFor="email">Email:</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-gray-200 rounded-md"
          type="email"
          name="email"
        />
        <button
          type="submit"
          className="w-full bg-green-200 rounded-md mt-4 hover:cursor-pointer"
        >
          Request Password Reset
        </button>
      </form>
    </div>
  );
}
