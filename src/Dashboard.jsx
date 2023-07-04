import { useState, useEffect } from "react";

export default function Dashboard() {
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(document.cookie);
  }, []);

  return (
    <div>
      <h1>You're Logged In</h1>
      <p>"Here's Your Token " + {token}</p>
    </div>
  );
}
