import React, { useEffect, useState } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { updateSearchCount } from "./appwrite";
const API_BASE_URL = "https://itunes.apple.com/search";

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    const term = searchTerm.trim();
    if (!term) {
      setMovies([]);
      setErrorMessage(null);
      return;
    }
    setLoading(true);
    setErrorMessage(null);
    try {
      setErrorMessage(null);

      const params = new URLSearchParams({
        term: searchTerm.trim(),
        limit: "20",
      });

      const endpoint = `${API_BASE_URL}?${params.toString()}`;
      console.log("Request:", endpoint);

      const res = await fetch(endpoint, API_OPTIONS);

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      console.log("Result count:", data.resultCount);

      const results = data.results || [];
      if (results.length === 0) {
        setMovies([]);
        setErrorMessage("No movies found.");
        return;
      }

      setMovies(results);
      if (term && data.results.length > 0) {
        await updateSearchCount(term, data.results[0]);
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
      setMovies([]);
      setErrorMessage("Failed to fetch movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {}, []);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./paint.png" alt="paint" />

          <h1>
            Find <span className="text-gradient">Movies</span> You Love
          </h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <button
            onClick={fetchMovies}
            className="mt-3 px-4 py-2 border rounded"
          >
            Search
          </button>
        </header>

        <section className="all-movies">
          <h2 className="mt-[20px]">All Movies</h2>
          {loading ? (
            <Spinner size={24} className="text-gray-700" />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul className="mt-3 grid gap-2">
              {movies.map((m, i) => {
                const key =
                  m.trackId ??
                  m.collectionId ??
                  m.artistId ??
                  m.trackViewUrl ??
                  `idx-${i}`;
                return <MovieCard key={key} m={m} />;
              })}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
