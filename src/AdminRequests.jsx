import { useState, useEffect, useRef } from "react";
import AlertIcon from "./assets/AlertIcon";
import ApproveIcon from "./assets/ApproveIcon";
import DenyIcon from "./assets/DenyIcon";
export default function AdminRequests({ user }) {
  const [pendingRequests, setPendingRequests] = useState(null);
  const [showPending, setShowPending] = useState(false);
  const [pendingUserDetails, setPendingUserDetails] = useState(null);

  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const ref = useRef(); // Create a ref

  useEffect(() => {
    const cookie = getCookie("token");
    setToken(cookie);
    const cookie2 = getCookie("userId");
    setUserId(cookie2);
  }, []);
  //extract token from cookie
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  useEffect(() => {
    if (!user) {
      return;
    } else {
      console.log(user);
      const promises = async () => {
        Promise.all(
          user.admin.map((group) => {
            return fetch("http://localhost:3000/groups/" + group, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " + token,
              },
            })
              .then((res) => res.json())
              .then((group) => {
                console.log(group);
                return group.pendingUsers;
              });
          })
        ).then((data) => {
          console.log(data);
          setPendingRequests(data);
        });
      };
      //fix this code to first use the user.admin field to fetch the groups and pull the pendingUsers
      //setPendingRequests(user);
      promises();
    }
  }, [user, token]);
  //this function will pull details of the pending users
  useEffect(() => {
    if (showPending) {
      fetch("http://localhost:3000/users/" + pendingRequests, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((user) => {
          console.log(user); // log the received user data
          return user;
        });
    }
  }, [showPending, pendingRequests, token]);

  // Click outside to hide pending users
  useEffect(() => {
    function handleClickOutside(event) {
      console.log("Div Pressed");
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
    if (pendingUserDetails) {
      return (
        <div
          ref={ref}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 translate-y-1/2 bg-gray-200 p-4 rounded-md"
        >
          {pendingUserDetails.map((user) => {
            return (
              <div
                className="flex
              "
                key={user._id}
              >
                <h1>{user.username}</h1>
                <ApproveIcon />
                <DenyIcon />
              </div>
            );
          })}
        </div>
      );
    }
  };

  const numberPendingRequests = () => {
    var total = 0;
    pendingRequests.forEach((group) => {
      total += group.length;
    });
    return total;
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

          <p className="absolute top-0 right-2">{numberPendingRequests()}</p>
        </div>
      );
    } else {
      return;
    }
  };
  console.log(pendingRequests);
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
