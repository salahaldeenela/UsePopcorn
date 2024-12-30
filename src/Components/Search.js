import { useEffect, useRef } from "react";

export function Search({ query, setQuery }) {
  const inputEl = useRef(null);
  useEffect(function () {
    function callBack(e) {
      if (e.code === "Enter") inputEl.current.focus();
    }
    document.addEventListener("keydown", callBack);
    return () => document.removeEventListener("keydown", callBack);
  }, []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
