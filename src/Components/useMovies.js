import { useEffect, useState } from "react";
export const KEY = "bdd80d47";
export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}
      `,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error("Oops something went wrong try again later");
          const data = await res.json();
          if (data.Response === "False")
            throw new Error("Couldnt find the movie");
          setMovies(() => data.Search);
          setIsLoading(false);
        } catch (err) {
          if (err.name !== "AbortError") setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}
