import { useState, useEffect, useRef } from "react";
import AlertIcon from "./assets/AlertIcon";
import NotificationIcon from "./assets/NotificationIcon";
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
      //flatten the array of pending users

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
                return { group: group, users: group.pendingUsers };
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
    const fetchUserDetails = async () => {
      try {
        let totalUsersArray = [];

        for (const group of pendingRequests) {
          let users = [];
          for (const user of group.users) {
            await fetch("http://localhost:3000/users/" + user, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " + token,
              },
            })
              .then((res) => res.json())
              .then((data) => users.push(data));
          }

          totalUsersArray.push({ group: group.group, users: users });
        }

        setPendingUserDetails(totalUsersArray);
      } catch (error) {
        console.error("Error fetching user details:", error);
        // Handle your error appropriately here, e.g. show an error message
      }
    };

    if (showPending) {
      fetchUserDetails();
    }
  }, [showPending, pendingRequests, token]);

  // Click outside to hide pending users
  useEffect(() => {
    function handleClickOutside(event) {
      console.log("ref", event.target);
      if (ref.current && !ref.current.contains(event.target)) {
        if (!event.target.matches(".logout-button")) {
          setShowPending(false);
        }
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  //function to approve user request and add to group
  const addUserToGroup = (userId, groupId) => {
    console.log("add user" + userId + " to group" + groupId);
    fetch(
      "http://localhost:3000/groups/" + groupId + "/activeusers/" + userId,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  //this function will deny the user request
  const denyUserToGroup = (userId, groupId) => {
    console.log("deny user" + userId + " to group" + groupId);
    fetch(
      "http://localhost:3000/groups/" + groupId + "/pendingusers/" + userId,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  //this function will show the pending users
  const showPendingUsers = () => {
    if (pendingUserDetails) {
      console.log(pendingUserDetails);

      return (
        showPending && (
          <div
            ref={ref}
            className="absolute right-0  bg-gray-200 rounded-md w-48"
          >
            {pendingUserDetails.map((group) => {
              return (
                <div className="w-full h-full" key={group.group._id}>
                  <ul className="w-full h-full flex flex-col p-2 m-0">
                    <p className="mb-2">{group.group.name}</p>
                    {group.users.map((user) => {
                      return (
                        <li
                          className=" w-full flex justify-between"
                          key={user._id}
                        >
                          <p className="w-1/2">{user.username}</p>{" "}
                          <div className="flex">
                            <div
                              onClick={() =>
                                //call function with user id and group id
                                addUserToGroup(user._id, group.group._id)
                              }
                            >
                              <ApproveIcon />
                            </div>
                            <div
                              onClick={() =>
                                denyUserToGroup(user._id, group.group._id)
                              }
                            >
                              <DenyIcon />
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        )
      );
    }
  };
  //this function will count the number of pending requests
  const numberPendingRequests = () => {
    var total = 0;
    pendingRequests.forEach((group) => {
      total += group.users.length;
    });
    return total;
  };

  //display the number of pending requests
  const displayRequests = () => {
    if (pendingRequests.length > 0) {
      return (
        <div
          onClick={() => setShowPending(true)}
          className="relative  rounded-full p-1 hover:bg-gray-200 mr-2"
        >
          <NotificationIcon />

          <p className="absolute top-0 text-xs right-0">
            {numberPendingRequests()}
          </p>
          {showPendingUsers()}
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
