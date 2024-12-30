import { useEffect, useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { Loading } from "./Loading";
import { NumResult } from "./NumResult";
import { Search } from "./Search";
import { Box } from "./Box";
import { MoviesList } from "./MoviesList";
import { NavBar } from "./NavBar";
import { WatchedSummary } from "./WatchedSummary";
import { MovieDetails } from "./MovieDetails";
import { WatchedMovieList } from "./WatchedMovieList";
import { Main } from "./Main";
import { useMovies } from "./useMovies";
import { useLocaleStorageState } from "./useLocaleStorageState";
export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
export const KEY = "bdd80d47";

export default function App() {
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useLocaleStorageState([], "watched");
  const [selectedId, setSelectedId] = useState(null);
  function handleSelectedMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }
  const { movies, isLoading, error } = useMovies(query);
  function handleCloseMovie() {
    setSelectedId(null);
  }
  function handleDeleteWatched(id) {
    setWatched((movie) => movie.filter((item) => item.imdbid !== id));
  }
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loading />}
          {!isLoading && !error && (
            <MoviesList
              movies={movies}
              onSelectedMovies={handleSelectedMovie}
            />
          )}
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatchedMovie={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
