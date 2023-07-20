import React from "react";

export default function Posts({ posts, currentUser }) {
  const displayPosts = posts.map((post) => {
    console.log("Post", post);
    return (
      <li
        className={`p-4  rounded-lg shadow-lg mb-4 w-fit ${
          post.user && currentUser._id === post.user._id
            ? "bg-blue-200 ml-auto"
            : post.post.recommends
            ? "bg-green-200 mr-auto"
            : "bg-red-200 mr-auto"
        }`}
        key={post.id}
      >
        <h3>
          {post.user ? post.user.username : "Anonymous"}
          {post.post.recommends ? " recommends " : " does not recommend "}
          {post.post.movie}
        </h3>
      </li>
    );
  });

  return (
    <div className="pl-2 pr-2 overflow-y-scroll ">
      <ul className="flex flex-col overflow-y-auto">{displayPosts}</ul>
    </div>
  );
}
