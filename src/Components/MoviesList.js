import { Movie } from "./Movie";

export function MoviesList({ movies, onSelectedMovies }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          onSelectedMovies={onSelectedMovies}
          movie={movie}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
}
