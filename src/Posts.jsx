import React, { useState, useEffect } from "react";
import MovieDetails from "./MovieDetails";

export default function Posts({ posts, currentUser }) {
  const [movie, setMovie] = useState(null);
  const [showMovie, setShowMovie] = useState(false);

  const renderMovieDetails = (movie) => {
    setShowMovie(true);
    setMovie(movie);
  };

  const displayPosts = posts.map((post) => {
    console.log("Post", post);

    return (
      <li
        className={`p-4  rounded-lg shadow-lg mb-4 w-fit ${
          post.user && currentUser._id === post.user._id
            ? "bg-blue-300 ml-auto"
            : post.post.recommends
            ? "bg-lime-400 mr-auto"
            : "bg-red-400 mr-auto"
        }`}
        key={post.id}
      >
        <h3 className="text-white">
          {post.user ? post.user.username : "Anonymous"}
          {post.post.recommends ? " recommends " : " does not recommend "}
          <h3
            onClick={() => renderMovieDetails(post.post.movie)}
            className="inline text-amber-200"
          >
            {post.post.movie}
          </h3>
        </h3>
      </li>
    );
  });

  return (
    <div className="pl-2 pr-2 overflow-y-scroll ">
      <ul className="flex flex-col overflow-y-auto">{displayPosts}</ul>
      {showMovie && (
        <>
          <MovieDetails movie={movie} />
          <div
            onClick={() => setShowMovie(false)}
            className="text-white absolute top-1/4 right-12 hover:cursor-pointer hover:text-red-500"
          >
            Close
          </div>
        </>
      )}
    </div>
  );
}
