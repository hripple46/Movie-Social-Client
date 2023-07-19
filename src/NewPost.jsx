import { useState, useEffect } from "react";
import ThumbDownIcon from "./assets/ThumbDownIcon";
import ThumbUpIcon from "./assets/ThumbUpIcon";

export default function NewPost({ group, user, token }) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [movie, setMovie] = useState("");
  const [userRecommend, setUserRecommend] = useState(null);
  const [selected, setSelected] = useState(null);

  console.log(userRecommend);

  const submitPost = (e) => {
    e.preventDefault();
    console.log("Group", group);
    fetch("http://localhost:3000/groups/" + group.id + "/posts", {
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
        console.log("New Post", data);
        //refresh posts
        location.reload();
      });

    console.log("User submitted post to" + group.name);
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
        console.log(data);
        setResults(data.results.slice(0, 5));
        console.log("New Post", data);
      });
  }
  useEffect(() => {
    if (search) {
      querySearch();
    }
  }, [search]); // Dependency array to control when the effect is run
  const getResults = () => {
    return results.map((result) => {
      return (
        <li
          onClick={() => setMovie(result.title)}
          className="truncate"
          key={result.id}
        >
          {result.title}
        </li>
      );
    });
  };

  return (
    <div className="w-full h-10">
      <form
        className="flex justify-between w-full h-full"
        onSubmit={(e) => submitPost(e)}
      >
        <div className="w-1/3 h-full relative">
          <input
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
            <ul className="absolute bottom-full left-0 w-60 bg-gray-200 p-1 rounded-md">
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
              color={selected === "recommends" ? "green" : "default"}
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
              color={selected === "doesNotRecommend" ? "red" : "default"}
            />
          </label>
        </div>
        <button className="w-1/4 bg-green-200 rounded-md" type="submit">
          Post
        </button>
      </form>
    </div>
  );
}
