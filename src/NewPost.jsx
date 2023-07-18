import { useState, useEffect } from "react";

export default function NewPost({ group }) {
  const [newPost, setNewPost] = useState("");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const submitPost = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/groups/" + group.id + "/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        post: {
          text: newPost,
        },
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("New Post", data);
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
        <li className="truncate" key={result.id}>
          {result.title}
        </li>
      );
    });
  };

  return (
    <div className="w-full h-10">
      <form className="flex w-full h-full" onSubmit={(e) => submitPost(e)}>
        <div className="w-1/3 h-full relative">
          <input
            className="w-full h-full border-gray-400 border-2 rounded-md"
            type="text"
            placeholder="Avatar"
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && results.length > 0 && (
            <ul className="absolute bottom-full left-0 w-60 bg-gray-200 p-1 rounded-md">
              {getResults()}
            </ul>
          )}
        </div>
        <input
          onChange={(e) => setNewPost(e.target.value)}
          className="w-1/3 h-full border-gray-400 border-2 rounded-md"
          name="newPost"
          type="text"
          placeholder="Charlie recommends The Matrix"
        />
        <button className="w-1/4" type="submit">
          Post
        </button>
      </form>
    </div>
  );
}
