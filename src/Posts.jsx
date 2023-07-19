import React from "react";

export default function Posts({ posts, currentUser }) {
  const displayPosts = posts.map((post) => {
    console.log("Post", post);
    return (
      <li
        className={`p-4  rounded-lg shadow-lg mb-4 w-fit ${
          post.user && currentUser._id === post.user._id
            ? "bg-green-200 ml-auto"
            : "bg-blue-200 mr-auto"
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
    <div className="pl-2 pr-2 ">
      <ul className="flex flex-col">{displayPosts}</ul>
    </div>
  );
}
