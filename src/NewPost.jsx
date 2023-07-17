import { useState } from "react";

export default function NewPost({ user }) {
  return (
    <div className="w-3/4 h-8 bg-gray-200 right-4 absolute bottom-8">
      <form className="w-full h-full">
        <input
          className="w-full h-full border-gray-400 border-2 rounded-md"
          name="newPost"
          type="text"
          placeholder="Charlie recommends The Matrix"
        />
      </form>
    </div>
  );
}
