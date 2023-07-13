import { useState, useEffect } from "react";

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
        <div>
          <h1>Pending Requests</h1>
          <p>{pendingRequests.length}</p>
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
