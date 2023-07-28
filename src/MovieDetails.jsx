import { useState, useEffect, useRef } from "react";

export default function MovieDetails({
  movie,
  movieResult,
  showMovie,
  onHide,
  movieId,
  onResetMovieId,
}) {
  const [trailerKey, setTrailerKey] = useState("");
  const [summary, setSummary] = useState("");

  const [iframeSize, setIframeSize] = useState({ width: "560", height: "315" });

  useEffect(() => {
    function handleResize() {
      if (window.matchMedia("(max-width: 768px)").matches) {
        // If the screen size is 768px or less, set iframe size to 370x208
        setIframeSize({ width: "320", height: "180" });
      } else {
        // If the screen size is more than 768px, set iframe size to 560x315
        setIframeSize({ width: "560", height: "315" });
      }
    }

    // Call the function initially to set the size
    handleResize();

    // Subscribe to window resize events
    window.addEventListener("resize", handleResize);

    // Clean up function
    return () => {
      // Unsubscribe from window resize events
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures effect is only run on mount and unmount

  useEffect(() => {
    if (movieId === null) {
      return;
    }
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?api_key=485d8a56998fcd2544afe768df960067&language=en-US"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data.results;
      })
      .then((results) => {
        if (results.find(findTrailer) === undefined) {
          setTrailerKey("");
          return;
        }

        setTrailerKey(results.find(findTrailer).key);
      });
  }, [movieId]);
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "?api_key=485d8a56998fcd2544afe768df960067&language=en-US"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.overview === "") {
          setSummary("No summary available");
          return;
        } else {
          setSummary(data.overview);
        }
      });
  }, [movieId]);

  const findTrailer = (index) => {
    return index.type === "Trailer";
  };

  const hideAndReset = () => {
    onHide();
    onResetMovieId();
  };

  const youtubeVideo = () => {
    const url = "https://www.youtube.com/embed/" + trailerKey;
    return (
      <iframe
        width={iframeSize.width}
        height={iframeSize.height}
        src={url}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    );
  };

  return (
    <div className="text-white fixed flex justify-center items-center inset-0 w-full z-50 h-full">
      <div className="z-50 relative">
        {trailerKey && youtubeVideo()}
        <p className={trailerKey ? "absolute" : "w-96"}>{summary}</p>
      </div>

      <div
        onClick={hideAndReset}
        id="movie-details"
        className="fixed inset-0 flex items-center justify-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      ></div>
    </div>
  );
}
