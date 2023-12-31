import React, { useState, useEffect } from "react";
import MovieDetails from "./MovieDetails";

export default function Posts({ posts, currentUser }) {
  const [movie, setMovie] = useState(null);
  const [showMovie, setShowMovie] = useState(false);
  const [movieResult, setMovieResult] = useState([{}]);
  const [movieId, setMovieId] = useState(null);

  const renderMovieDetails = async (movie) => {
    setShowMovie(true);

    const response = await fetch(
      "https://api.themoviedb.org/3/search/movie?api_key=485d8a56998fcd2544afe768df960067&language=en-US&query=" +
        movie +
        "&page=1@include_adult=false"
    );
    const data = await response.json();
    setMovieResult(data.results[0]);

    setMovieId(data.results[0].id);
  };

  const displayPosts = posts.map((post) => {
    return (
      <li
        className={`p-4  rounded-lg bg-stone-900/75 text-white shadow-lg mb-4 w-fit ${
          post.user && currentUser._id === post.user._id
            ? "border-2 border-gray-300 ml-auto"
            : post.post.recommends
            ? "border-2 border-lime-600  mr-auto"
            : "border-2 border-red-600  mr-auto"
        }`}
        key={post.id}
      >
        <h3 className="text-white">
          {post.user ? post.user.username : "Anonymous"}
          {post.post.recommends ? " recommends " : " does not recommend "}
          <h3
            onClick={() => movieOnClick(post.post.movie)}
            className="inline text-sky-300 hover:cursor-pointer hover:underline"
          >
            {post.post.movie}
          </h3>
        </h3>
      </li>
    );
  });
  const movieOnClick = (movie) => {
    setMovie(movie);
    renderMovieDetails(movie);
  };
  return (
    <div className="pl-2 pr-2  mb-10 mt-10">
      <ul className="flex flex-col ">{displayPosts}</ul>
      {showMovie && (
        <>
          <MovieDetails
            movie={movie}
            movieId={movieId}
            movieResult={movieResult}
            onHide={() => setShowMovie(false)}
            onResetMovieId={() => setMovieId(null)}
          />

          <div
            onClick={() => setShowMovie(false)}
            className="text-black absolute top-1/4 right-12 hover:cursor-pointer hover:text-red-500"
          >
            Close
          </div>
        </>
      )}
    </div>
  );
}
