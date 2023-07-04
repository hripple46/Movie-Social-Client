import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Dashboard() {
  const [token, setToken] = useState("");

  const location = useLocation();

  useEffect(() => {
    setToken(document.cookie);
  }, []);
  console.log(location.state);

  return (
    <div>
      <h1>You're Logged In</h1>
      <p>Here's Your User ID + {location.state.userId}</p>
      <p>Here's Your Token + {location.state.token}</p>
    </div>
  );
}
