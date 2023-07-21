import { useState, useEffect, useRef } from "react";

export default function MovieDetails({ movie, hide }) {
  return (
    <div
      id="movie-details"
      className="fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
    >
      <div className=" bg-white h-20 w-20">
        <h1>Movie Goes Here</h1>
      </div>
    </div>
  );
}
