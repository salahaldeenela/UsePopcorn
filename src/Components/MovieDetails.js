import { useState, useEffect, useRef } from "react";
import { KEY } from "./App";
import { Loading } from "./Loading";
import StarRating from "./StarRating";

export function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [SelectedMovie, setSelectedMovie] = useState({});
  const [userRating, SetUserRating] = useState(0);
  const isWatched = watched.map((item) => item.imdbid).includes(selectedId);
  const countRef = useRef(0);
  useEffect(
    function () {
      if (userRating) countRef.current++;
    },
    [userRating]
  );
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    imdbRating: imdbRating,
  } = SelectedMovie;
  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") onCloseMovie();
      }
      document.addEventListener("keydown", callback);
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [onCloseMovie]
  );
  useEffect(
    function () {
      async function getMovieDetails() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const movie = await res.json();
        setSelectedMovie(movie);
      }
      getMovieDetails();
    },
    [selectedId]
  );
  useEffect(
    function () {
      if (title) document.title = `${title}`;
      return function () {
        document.title = "UsePopcorn";
      };
    },
    [title]
  );
  function handleWatched() {
    const seen = {
      imdbid: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countedrated: countRef.current,
    };

    if (isWatched) {
      onCloseMovie();
      return;
    }

    onAddWatched(seen);
    onCloseMovie();
  }
  return (
    <div className="details">
      {false ? (
        <Loading />
      ) : (
        <>
          <header>
            <button onClick={onCloseMovie} className="btn-back">
              &larr;
            </button>
            <img src={poster} alt={`this is an poster of the move ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section>
            <StarRating maxRating={10} size={20} onSetRating={SetUserRating} />
            {userRating > 0 ? (
              <button className="btn-add" onClick={handleWatched}>
                + Add to list
              </button>
            ) : (
              ""
            )}
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring: {actors}</p>
            <p>Directed By {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
