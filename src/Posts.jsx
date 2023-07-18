import React from "react";

export default function Posts({ posts }) {
  const displayPosts = posts.map((post) => {
    return (
      <li className="p-4 bg-blue-200 rounded-lg shadow-lg mb-4" key={post.id}>
        <h3>
          User
          {post.recommends ? " recommends " : " does not recommend "}
          {post.movie}
        </h3>
      </li>
    );
  });
  return (
    <div className="pl-2 pr-2">
      <ul>{displayPosts}</ul>
    </div>
  );
}
