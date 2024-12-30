import { useEffect, useState } from "react";
export function useLocaleStorageState(intialValue, key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : intialValue;
  });
  useEffect(
    function () {
      function UpdateWatchedMovies() {
        localStorage.setItem(key, JSON.stringify(value));
      }
      UpdateWatchedMovies();
    },
    [value, key]
  );
  return [value, setValue];
}
