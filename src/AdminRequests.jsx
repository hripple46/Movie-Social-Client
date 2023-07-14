import { useState, useEffect } from "react";
import AlertIcon from "./assets/AlertIcon";
export default function AdminRequests({ user }) {
  const [pendingRequests, setPendingRequests] = useState(null);
  useEffect(() => {
    if (!user) {
      return;
    } else {
      setPendingRequests(user.admin);
    }
  }, [user]);

  const displayRequests = () => {
    if (pendingRequests.length > 0) {
      return (
        <div className="relative bg-red-200 rounded-full p-1">
          <AlertIcon />

          <p className="absolute top-0 right-2">{pendingRequests.length}</p>
        </div>
      );
    } else {
      return;
    }
  };

  return (
    <>
      {pendingRequests ? (
        <div>{displayRequests()}</div>
      ) : (
        <div>
          <h1>Not an Admin</h1>
        </div>
      )}
    </>
  );
}
