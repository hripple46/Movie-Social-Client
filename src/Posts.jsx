import React from "react";

export default function Posts({ posts, currentUser }) {
  const displayPosts = posts.map((post) => {
    console.log("Post", post);
    return (
      <li
        className={`p-4  rounded-lg shadow-lg mb-4 w-fit ${
          post.user && currentUser._id === post.user._id
            ? "bg-blue-400 ml-auto"
            : post.post.recommends
            ? "bg-green-500 mr-auto"
            : "bg-red-500 mr-auto"
        }`}
        key={post.id}
      >
        <h3 className="text-white">
          {post.user ? post.user.username : "Anonymous"}
          {post.post.recommends ? " recommends " : " does not recommend "}
          <h3 className="inline text-amber-200">{post.post.movie}</h3>
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
