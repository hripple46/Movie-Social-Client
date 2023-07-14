import { useState, useEffect, useRef } from "react";
import AlertIcon from "./assets/AlertIcon";
export default function AdminRequests({ user }) {
  const [pendingRequests, setPendingRequests] = useState(null);
  const [showPending, setShowPending] = useState(false);
  const ref = useRef(); // Create a ref

  useEffect(() => {
    if (!user) {
      return;
    } else {
      setPendingRequests(user.admin);
    }
  }, [user]);

  // Click outside to hide pending users
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowPending(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  //this function will show the pending users
  const showPendingUsers = () => {
    if (showPending) {
      return (
        <div
          ref={ref}
          className="absolute -bottom-8 bg-gray-200 p-4 rounded-md"
        >
          {pendingRequests.map((user) => {
            return (
              <div key={user}>
                <h1>{user}</h1>
              </div>
            );
          })}
        </div>
      );
    }
  };

  //display the number of pending requests
  const displayRequests = () => {
    if (pendingRequests.length > 0) {
      return (
        <div
          onClick={() => setShowPending(true)}
          className="relative bg-red-200 rounded-full p-1 hover:bg-gray-200"
        >
          <AlertIcon />
          {showPendingUsers()}

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
