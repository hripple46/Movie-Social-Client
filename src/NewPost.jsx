import { useState } from "react";

export default function NewPost({ group }) {
  const submitPost = (e) => {
    e.preventDefault();
    console.log("User submitted post to" + group.name);
  };

  return (
    <div className="w-full h-10">
      <form className="w-full h-full" onSubmit={(e) => submitPost(e)}>
        <input
          className="w-3/4 h-full border-gray-400 border-2 rounded-md"
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
