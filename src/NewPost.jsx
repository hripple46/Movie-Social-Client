import { useState, useEffect, useRef } from "react";
import ThumbDownIcon from "./assets/ThumbDownIcon";
import ThumbUpIcon from "./assets/ThumbUpIcon";

export default function NewPost({ group, user, token }) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [movie, setMovie] = useState("");
  const [userRecommend, setUserRecommend] = useState(null);
  const [selected, setSelected] = useState(null);

  const searchRef = useRef(null);
  //add ref for input value
  const inputRef = useRef(null);

  //use eventhadnler to determine if click is outside of search bar and if so, set search to null
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearch("");
        setResults([]);
        //set movie to ""
        setMovie("");
        //set input value to ""
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  const submitPost = (e) => {
    e.preventDefault();
    fetch("https://billowing-dawn-923.fly.dev/groups/" + group.id + "/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        movie: movie,
        user: user,
        group: group,
        recommends: userRecommend,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //refresh posts
        location.reload();
      });
  };
  async function querySearch() {
    fetch(
      "https://api.themoviedb.org/3/search/movie?api_key=485d8a56998fcd2544afe768df960067&language=en-US&query=" +
        search +
        "&page=1@include_adult=false"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setResults(data.results.slice(0, 5));
      });
  }
  useEffect(() => {
    if (search) {
      querySearch();
    }
  }, [search]); // Dependency array to control when the effect is run

  function settingMovie(movie) {
    setMovie(movie);
    setSearch(null);
    setResults([]);
  }
  const getResults = () => {
    return results.map((result) => {
      return (
        <li
          onClick={() => settingMovie(result.title)}
          className="mb-2 flex justify-between hover:cursor-pointer "
          key={result.id}
        >
          {result.title}
          {result.poster_path ? (
            <img
              className="w-10 h-15"
              src={"https://image.tmdb.org/t/p/original" + result.poster_path}
            />
          ) : (
            <p className="w-10 ">No Poster</p>
          )}
        </li>
      );
    });
  };

  return (
    <div
      //add ref here
      ref={searchRef}
      className="w-full h-10"
    >
      <form
        className="flex justify-between w-full h-full"
        onSubmit={(e) => submitPost(e)}
      >
        <div className="w-1/3 h-full relative">
          <input
            ref={inputRef}
            className="w-full h-full border-gray-400 border-2 rounded-md"
            type="text"
            placeholder="Avatar"
            value={movie}
            onChange={(e) => {
              setSearch(e.target.value);
              setMovie(e.target.value);
              setResults([]);
            }}
          />
          {search && results.length > 0 && (
            <ul className="absolute bottom-full left-0 w-60 bg-stone-900/75 text-white shadow-lg rounded-lg p-2 ">
              {getResults()}
            </ul>
          )}
        </div>
        <div className="flex">
          <label
            className="hover:cursor-pointer flex items-center"
            htmlFor="recommends"
          >
            <input
              className="hidden"
              onClick={(e) => {
                setSelected("recommends");
                setUserRecommend(e.target.value);
              }}
              type="radio"
              name="recommend"
              value="true"
              id="recommends"
            />
            <ThumbUpIcon
              color={selected === "recommends" ? "green" : "black"}
            />
          </label>
        </div>
        <div className="flex ">
          <label
            className="hover:cursor-pointer flex items-center"
            htmlFor="doesNotRecommend"
          >
            <input
              className="hidden"
              onClick={(e) => {
                setSelected("doesNotRecommend");
                setUserRecommend(e.target.value);
              }}
              type="radio"
              name="recommend"
              value="false"
              id="doesNotRecommend"
            />
            <ThumbDownIcon
              color={selected === "doesNotRecommend" ? "red" : "black"}
            />
          </label>
        </div>
        <button
          className="w-1/4 bg-sky-300 text-white rounded-md"
          type="submit"
        >
          Post
        </button>
      </form>
    </div>
  );
}
